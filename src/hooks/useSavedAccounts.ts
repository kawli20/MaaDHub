import { useState, useCallback, useEffect } from "react";
import type { Account } from "@/data/accounts";

const STORAGE_KEY = "maadhub_saved_accounts";

export interface SavedAccount extends Account {
  savedAt: string;
}

function loadSaved(): SavedAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (a): a is SavedAccount =>
        Boolean(a && typeof a === "object" && typeof a.id === "number" && a.gameName)
    );
  } catch {
    return [];
  }
}

function persistSaved(accounts: SavedAccount[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  } catch {
    // ignore
  }
}

export function useSavedAccounts() {
  const [saved, setSaved] = useState<SavedAccount[]>(loadSaved);

  useEffect(() => {
    persistSaved(saved);
  }, [saved]);

  const isSaved = useCallback(
    (id: number) => saved.some((a) => a.id === id),
    [saved]
  );

  const toggleSave = useCallback((account: Account) => {
    if (!account || typeof account.id !== "number") return;
    setSaved((prev) => {
      const exists = prev.some((a) => a.id === account.id);
      if (exists) {
        return prev.filter((a) => a.id !== account.id);
      }
      return [...prev, { ...account, savedAt: new Date().toISOString() }];
    });
  }, []);

  const removeSaved = useCallback((id: number) => {
    setSaved((prev) => prev.filter((a) => a.id !== id));
  }, []);

  return { saved, isSaved, toggleSave, removeSaved };
}
