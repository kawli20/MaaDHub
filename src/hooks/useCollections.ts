import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "maadhub_collections";

export interface Collection {
  id: string;
  name: string;
  icon: string; // icon identifier key: 'folder' | 'gamepad' | 'flame' | 'swords' | 'crosshair' | 'trophy' | 'sparkles' | 'layers' | 'tag' | 'star' | 'shield' | 'zap'
  accountIds: number[];
  createdAt: string;
}

const DEFAULT_COLLECTIONS: Collection[] = [
  {
    id: "fps-games",
    name: "FPS & Shooters",
    icon: "crosshair",
    accountIds: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "rpg-adventures",
    name: "RPGs & Story",
    icon: "swords",
    accountIds: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "favorites",
    name: "Must-Play Vault",
    icon: "flame",
    accountIds: [],
    createdAt: new Date().toISOString(),
  },
];

// Clean map to convert any old emoji strings from localStorage into clean Lucide icon names
const EMOJI_TO_ICON_MAP: Record<string, string> = {
  "🎯": "crosshair",
  "⚔️": "swords",
  "🔥": "flame",
  "📁": "folder",
  "🎮": "gamepad",
  "🏆": "trophy",
  "🎲": "gamepad",
  "👾": "gamepad",
  "🚀": "zap",
  "💎": "sparkles",
  "⭐": "star",
};

function sanitizeIcon(icon: string): string {
  if (!icon) return "folder";
  if (EMOJI_TO_ICON_MAP[icon]) return EMOJI_TO_ICON_MAP[icon];
  // If icon contains emoji characters, fallback to folder
  if (/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u.test(icon)) {
    return "folder";
  }
  return icon;
}

function loadCollections(): Collection[] {
  if (typeof window === "undefined") return DEFAULT_COLLECTIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_COLLECTIONS;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_COLLECTIONS;
    return parsed
      .filter(
        (c): c is Collection =>
          Boolean(c && typeof c === "object" && typeof c.id === "string" && typeof c.name === "string" && Array.isArray(c.accountIds))
      )
      .map((c) => ({
        ...c,
        icon: sanitizeIcon(c.icon),
      }));
  } catch {
    return DEFAULT_COLLECTIONS;
  }
}

function persistCollections(collections: Collection[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
  } catch {
    // ignore
  }
}

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>(loadCollections);

  useEffect(() => {
    persistCollections(collections);
  }, [collections]);

  const createCollection = useCallback((name: string, icon: string = "folder") => {
    const trimmed = name.trim();
    if (!trimmed) return "";
    const id = "col_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
    const newCollection: Collection = {
      id,
      name: trimmed,
      icon: sanitizeIcon(icon) || "folder",
      accountIds: [],
      createdAt: new Date().toISOString(),
    };
    setCollections((prev) => [...prev, newCollection]);
    return id;
  }, []);

  const deleteCollection = useCallback((id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const renameCollection = useCallback((id: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setCollections((prev) => prev.map((c) => (c.id === id ? { ...c, name: trimmed } : c)));
  }, []);

  const toggleAccountInCollection = useCallback((collectionId: string, accountId: number) => {
    setCollections((prev) =>
      prev.map((c) => {
        if (c.id !== collectionId) return c;
        const exists = c.accountIds.includes(accountId);
        return {
          ...c,
          accountIds: exists
            ? c.accountIds.filter((id) => id !== accountId)
            : [...c.accountIds, accountId],
        };
      })
    );
  }, []);

  const addToCollection = useCallback((collectionId: string, accountId: number) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId && !c.accountIds.includes(accountId)
          ? { ...c, accountIds: [...c.accountIds, accountId] }
          : c
      )
    );
  }, []);

  const removeFromCollection = useCallback((collectionId: string, accountId: number) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId
          ? { ...c, accountIds: c.accountIds.filter((id) => id !== accountId) }
          : c
      )
    );
  }, []);

  const isInCollection = useCallback(
    (collectionId: string, accountId: number) => {
      const collection = collections.find((c) => c.id === collectionId);
      return collection ? collection.accountIds.includes(accountId) : false;
    },
    [collections]
  );

  const getAccountCollectionIds = useCallback(
    (accountId: number) => {
      return collections.filter((c) => c.accountIds.includes(accountId)).map((c) => c.id);
    },
    [collections]
  );

  return {
    collections,
    createCollection,
    deleteCollection,
    renameCollection,
    addToCollection,
    removeFromCollection,
    toggleAccountInCollection,
    isInCollection,
    getAccountCollectionIds,
  };
}
