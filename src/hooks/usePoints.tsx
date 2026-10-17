import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useAuth } from "@/lib/clerk";
import type { Account } from "@/data/accounts";

export interface PointsTransaction {
  id: string;
  title: string;
  pointsDelta: number;
  timestamp: string;
  type: "welcome" | "unlock" | "referral_bonus" | "referral_reward";
}

export interface PointsState {
  points: number;
  unlockedAccountIds: number[];
  referralCode: string;
  referredBy: string | null;
  invitedCount: number;
  pointsEarnedFromInvites: number;
  history: PointsTransaction[];
}

export interface PointsContextType {
  points: number;
  unlockedAccountIds: number[];
  referralCode: string;
  invitedCount: number;
  pointsEarnedFromInvites: number;
  history: PointsTransaction[];
  isPointsModalOpen: boolean;
  setIsPointsModalOpen: (open: boolean) => void;
  selectedAccountToUnlock: Account | null;
  setSelectedAccountToUnlock: (account: Account | null) => void;
  isUnlocked: (accountId: number, pointsCost?: number) => boolean;
  unlockAccount: (account: Account) => Promise<{ success: boolean; reason?: string }>;
  addPoints: (amount: number, title: string, type?: PointsTransaction["type"]) => void;
  getInviteLink: () => string;
}

const INITIAL_POINTS = 50;
const STORAGE_PREFIX = "maadhub_points_v2_";
const PENDING_REFERRAL_KEY = "maadhub_pending_referral";

function generateReferralCode(userId?: string | null): string {
  if (userId) {
    const cleanId = userId.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
    return cleanId.length > 6 ? cleanId.slice(-6) : `MDH${cleanId}`;
  }
  return `MDH${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
}

function getInitialState(userId?: string | null): PointsState {
  const code = generateReferralCode(userId);
  return {
    points: INITIAL_POINTS,
    unlockedAccountIds: [],
    referralCode: code,
    referredBy: null,
    invitedCount: 0,
    pointsEarnedFromInvites: 0,
    history: [
      {
        id: `tx_${Date.now()}_init`,
        title: "Welcome Bonus",
        pointsDelta: INITIAL_POINTS,
        timestamp: new Date().toISOString(),
        type: "welcome",
      },
    ],
  };
}

const DEFAULT_POINTS_CTX: PointsContextType = {
  points: INITIAL_POINTS,
  unlockedAccountIds: [],
  referralCode: "MDH77",
  invitedCount: 0,
  pointsEarnedFromInvites: 0,
  history: [],
  isPointsModalOpen: false,
  setIsPointsModalOpen: () => {},
  selectedAccountToUnlock: null,
  setSelectedAccountToUnlock: () => {},
  isUnlocked: (_id, cost) => !cost || cost <= 0,
  unlockAccount: async () => ({ success: true }),
  addPoints: () => {},
  getInviteLink: () => (typeof window !== "undefined" ? window.location.origin : "https://vought.online"),
};

const PointsContext = createContext<PointsContextType>(DEFAULT_POINTS_CTX);

export function PointsProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const userId = auth?.user?.id;
  const { isLoaded, getToken } = auth;

  const storageKey = useMemo(() => {
    return `${STORAGE_PREFIX}${userId || "guest"}`;
  }, [userId]);

  const [state, setState] = useState<PointsState>(() => {
    if (typeof window === "undefined") return getInitialState(userId);
    try {
      const key = `${STORAGE_PREFIX}${userId || "guest"}`;
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.points === "number") {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return getInitialState(userId);
  });

  const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
  const [selectedAccountToUnlock, setSelectedAccountToUnlock] = useState<Account | null>(null);

  // Keep referral attribution while a visitor completes sign-up or sign-in.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const url = new URL(window.location.href);
      const referralCode = url.searchParams.get("ref") || url.searchParams.get("invite");
      if (!referralCode) return;
      sessionStorage.setItem(PENDING_REFERRAL_KEY, referralCode.trim().toUpperCase());
      url.searchParams.delete("ref");
      url.searchParams.delete("invite");
      window.history.replaceState({}, "", url.toString());
    } catch {
      // Referral links are optional; continue without referral attribution if storage is unavailable.
    }
  }, []);

  // Persist state changes to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state, storageKey]);

  // Refresh the authoritative balance on sign-in and whenever the points panel opens.
  useEffect(() => {
    if (typeof window === "undefined" || !isLoaded || !userId) return;
    let active = true;

    const syncProfile = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const referralCode = sessionStorage.getItem(PENDING_REFERRAL_KEY);
        const response = await fetch("/api/points/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ referralCode }),
        });
        if (!response.ok) throw new Error(`Points sync failed (${response.status})`);
        const profile = await response.json() as PointsState;
        if (active) setState(profile);
        sessionStorage.removeItem(PENDING_REFERRAL_KEY);
      } catch (error) {
        console.error("Could not sync points from the server", error);
      }
    };

    void syncProfile();
    return () => {
      active = false;
    };
  }, [getToken, isLoaded, isPointsModalOpen, userId]);

  const isUnlocked = useCallback(
    (accountId: number, pointsCost?: number) => {
      if (!pointsCost || pointsCost <= 0) return true;
      return state.unlockedAccountIds.includes(accountId);
    },
    [state.unlockedAccountIds]
  );

  const unlockAccount = useCallback(
    async (account: Account): Promise<{ success: boolean; reason?: string }> => {
      const cost = account.pointsCost || 0;
      if (cost <= 0 || state.unlockedAccountIds.includes(account.id)) {
        return { success: true };
      }
      if (!userId) return { success: false, reason: "authentication_required" };

      try {
        const token = await getToken();
        if (!token) return { success: false, reason: "authentication_required" };
        const response = await fetch("/api/points/unlock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ accountId: account.id }),
        });
        if (response.status === 409) return { success: false, reason: "insufficient_points" };
        if (!response.ok) return { success: false, reason: "server_error" };
        const profile = await response.json() as PointsState;
        setState(profile);
        return { success: true };
      } catch (error) {
        console.error("Could not unlock account with server points", error);
        return { success: false, reason: "server_error" };
      }
    },
    [getToken, state.unlockedAccountIds, userId]
  );

  const addPoints = useCallback(
    (amount: number, title: string, type: PointsTransaction["type"] = "welcome") => {
      setState((prev) => {
        const newHistory: PointsTransaction = {
          id: `tx_${Date.now()}_manual`,
          title,
          pointsDelta: amount,
          timestamp: new Date().toISOString(),
          type,
        };
        return {
          ...prev,
          points: Math.max(0, prev.points + amount),
          history: [newHistory, ...prev.history],
        };
      });
    },
    []
  );

  const getInviteLink = useCallback(() => {
    if (typeof window === "undefined") return `https://vought.online/?ref=${state.referralCode}`;
    return `${window.location.origin}/?ref=${state.referralCode}`;
  }, [state.referralCode]);

  const value = useMemo(
    () => ({
      points: state.points,
      unlockedAccountIds: state.unlockedAccountIds,
      referralCode: state.referralCode,
      invitedCount: state.invitedCount,
      pointsEarnedFromInvites: state.pointsEarnedFromInvites,
      history: state.history,
      isPointsModalOpen,
      setIsPointsModalOpen,
      selectedAccountToUnlock,
      setSelectedAccountToUnlock,
      isUnlocked,
      unlockAccount,
      addPoints,
      getInviteLink,
    }),
    [
      state,
      isPointsModalOpen,
      selectedAccountToUnlock,
      isUnlocked,
      unlockAccount,
      addPoints,
      getInviteLink,
    ]
  );

  return <PointsContext.Provider value={value}>{children}</PointsContext.Provider>;
}

export function usePoints() {
  return useContext(PointsContext);
}
