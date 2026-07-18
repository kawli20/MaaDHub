import { useState, useCallback, useEffect } from "react";
import type { Account } from "@/data/accounts";

const STORAGE_KEY = "maadhub_saved_accounts";

export interface SavedAccount extends Account {
  savedAt: string;
}

function loadSaved(): SavedAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistSaved(accounts: SavedAccount[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
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
