import { useState, useCallback, useEffect } from "react";
import type { Account } from "@/data/accounts";

const STORAGE_KEY = "maadhub_recently_viewed";
const MAX_RECENT = 20;

export interface RecentlyViewedAccount extends Account {
  viewedAt: string;
}

function loadRecent(): RecentlyViewedAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is RecentlyViewedAccount =>
        Boolean(item && typeof item === "object" && typeof item.id === "number" && item.gameName)
    );
  } catch {
    return [];
  }
}

function persistRecent(accounts: RecentlyViewedAccount[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  } catch {
    // ignore
  }
}

export function useRecentlyViewed() {
  const [recent, setRecent] = useState<RecentlyViewedAccount[]>(loadRecent);

  useEffect(() => {
    persistRecent(recent);
  }, [recent]);

  const addToRecent = useCallback((account: Account) => {
    if (!account || typeof account.id !== "number") return;
    setRecent((prev) => {
      const filtered = prev.filter((a) => a.id !== account.id);
      return [
        { ...account, viewedAt: new Date().toISOString() },
        ...filtered,
      ].slice(0, MAX_RECENT);
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecent([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const removeFromRecent = useCallback((id: number) => {
    setRecent((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return { recent, addToRecent, clearRecent, removeFromRecent };
}
