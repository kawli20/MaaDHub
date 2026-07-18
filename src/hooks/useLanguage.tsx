import { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { Lang } from "@/i18n/translations";
import { LANGUAGES, t } from "@/i18n/translations";

// Clear ALL old language keys from localStorage on load
if (typeof window !== "undefined") {
  try {
    localStorage.removeItem("maadhub_language");
    localStorage.removeItem("maadhub_lang_v2");
  } catch {
    // ignore
  }
}

const STORAGE_KEY = "maadhub_lang_v3";

interface LanguageContextType {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  dir: "ltr",
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  const dir = LANGUAGES.find((l) => l.code === lang)?.dir ?? "ltr";

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
    document.body.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang, dir]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
  }, []);

  const translate = useCallback(
    (key: string) => t(lang, key),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, dir, setLang, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
