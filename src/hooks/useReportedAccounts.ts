import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "maadhub_reported_accounts";

function loadReported(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is number => typeof id === "number") : [];
  } catch {
    return [];
  }
}

function persistReported(ids: number[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function useReportedAccounts() {
  const [reportedIds, setReportedIds] = useState<number[]>(loadReported);

  useEffect(() => {
    persistReported(reportedIds);
  }, [reportedIds]);

  const markReported = useCallback((id: number) => {
    setReportedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const isReported = useCallback(
    (id: number) => reportedIds.includes(id),
    [reportedIds]
  );

  return { reportedIds, markReported, isReported };
}
