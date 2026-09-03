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
  unlockAccount: (account: Account) => { success: boolean; reason?: string };
  addPoints: (amount: number, title: string, type?: PointsTransaction["type"]) => void;
  getInviteLink: () => string;
}

const INITIAL_POINTS = 50;
const REFERRAL_BONUS = 10;
const STORAGE_PREFIX = "maadhub_points_v2_";
const GLOBAL_REFERRALS_KEY = "maadhub_global_referral_ledger";

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
  unlockAccount: () => ({ success: true }),
  addPoints: () => {},
  getInviteLink: () => (typeof window !== "undefined" ? window.location.origin : "https://maadhub.com"),
};

const PointsContext = createContext<PointsContextType>(DEFAULT_POINTS_CTX);

export function PointsProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const userId = auth?.user?.id;

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

  // Sync state when user switches account
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.points === "number") {
          setState(parsed);
          return;
        }
      }
      // Check if guest state exists to migrate
      const guestRaw = localStorage.getItem(`${STORAGE_PREFIX}guest`);
      if (guestRaw && userId) {
        const guestParsed = JSON.parse(guestRaw);
        const migrated: PointsState = {
          ...guestParsed,
          referralCode: generateReferralCode(userId),
        };
        setState(migrated);
        localStorage.setItem(storageKey, JSON.stringify(migrated));
        return;
      }
      const initial = getInitialState(userId);
      setState(initial);
      localStorage.setItem(storageKey, JSON.stringify(initial));
    } catch {
      // fallback
    }
  }, [storageKey, userId]);

  // Persist state changes to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state, storageKey]);

  // Handle URL Referral links (?ref=CODE or ?invite=CODE)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const refParam = urlParams.get("ref") || urlParams.get("invite");
      if (!refParam) return;

      const cleanRef = refParam.trim().toUpperCase();
      if (cleanRef === state.referralCode) return;
      if (state.referredBy) return;

      setState((prev) => {
        if (prev.referredBy) return prev;
        const newHistory: PointsTransaction = {
          id: `tx_${Date.now()}_ref_bonus`,
          title: `Invited by ${cleanRef} (+10 Bonus)`,
          pointsDelta: REFERRAL_BONUS,
          timestamp: new Date().toISOString(),
          type: "referral_bonus",
        };
        return {
          ...prev,
          points: prev.points + REFERRAL_BONUS,
          referredBy: cleanRef,
          history: [newHistory, ...prev.history],
        };
      });

      // Record in global referral ledger for referrer
      try {
        const ledgerRaw = localStorage.getItem(GLOBAL_REFERRALS_KEY) || "{}";
        const ledger = JSON.parse(ledgerRaw);
        ledger[cleanRef] = (ledger[cleanRef] || 0) + 1;
        localStorage.setItem(GLOBAL_REFERRALS_KEY, JSON.stringify(ledger));
      } catch {
        // ignore
      }

      // Clean query params from URL without page reload
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("ref");
      newUrl.searchParams.delete("invite");
      window.history.replaceState({}, "", newUrl.toString());
    } catch {
      // ignore
    }
  }, [state.referralCode, state.referredBy]);

  // Check if this user received new referral rewards
  useEffect(() => {
    if (typeof window === "undefined" || !state.referralCode) return;
    try {
      const ledgerRaw = localStorage.getItem(GLOBAL_REFERRALS_KEY) || "{}";
      const ledger = JSON.parse(ledgerRaw);
      const totalInvitedForCode = ledger[state.referralCode] || 0;
      if (totalInvitedForCode > state.invitedCount) {
        const newInvites = totalInvitedForCode - state.invitedCount;
        const earnedPoints = newInvites * REFERRAL_BONUS;

        setState((prev) => {
          const newHistory: PointsTransaction = {
            id: `tx_${Date.now()}_ref_reward`,
            title: `Friend joined with your link (+${newInvites} invite${newInvites > 1 ? "s" : ""})`,
            pointsDelta: earnedPoints,
            timestamp: new Date().toISOString(),
            type: "referral_reward",
          };
          return {
            ...prev,
            points: prev.points + earnedPoints,
            invitedCount: totalInvitedForCode,
            pointsEarnedFromInvites: prev.pointsEarnedFromInvites + earnedPoints,
            history: [newHistory, ...prev.history],
          };
        });
      }
    } catch {
      // ignore
    }
  }, [state.referralCode, state.invitedCount]);

  const isUnlocked = useCallback(
    (accountId: number, pointsCost?: number) => {
      if (!pointsCost || pointsCost <= 0) return true;
      return state.unlockedAccountIds.includes(accountId);
    },
    [state.unlockedAccountIds]
  );

  const unlockAccount = useCallback(
    (account: Account): { success: boolean; reason?: string } => {
      const cost = account.pointsCost || 0;
      if (cost <= 0 || state.unlockedAccountIds.includes(account.id)) {
        return { success: true };
      }

      if (state.points < cost) {
        return { success: false, reason: "insufficient_points" };
      }

      setState((prev) => {
        if (prev.unlockedAccountIds.includes(account.id)) return prev;
        const newHistory: PointsTransaction = {
          id: `tx_${Date.now()}_unlock_${account.id}`,
          title: `Unlocked ${account.gameName}`,
          pointsDelta: -cost,
          timestamp: new Date().toISOString(),
          type: "unlock",
        };
        return {
          ...prev,
          points: prev.points - cost,
          unlockedAccountIds: [...prev.unlockedAccountIds, account.id],
          history: [newHistory, ...prev.history],
        };
      });

      return { success: true };
    },
    [state.points, state.unlockedAccountIds]
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
    if (typeof window === "undefined") return `https://maadhub.com/?ref=${state.referralCode}`;
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
