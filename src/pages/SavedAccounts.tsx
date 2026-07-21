import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { useSavedAccounts } from "@/hooks/useSavedAccounts";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/Toast";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SearchFilters } from "@/components/SearchFilters";
import { BookmarkX, ArrowLeft, Bookmark, Trash2 } from "lucide-react";

export default function SavedAccounts() {
  const { t } = useLanguage();
  const { saved, removeSaved } = useSavedAccounts();
  const { toasts, addToast, removeToast } = useToast();
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filteredSaved = useMemo(() => {
    let result = [...saved];

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (account) =>
          account.gameName.toLowerCase().includes(s) ||
          account.platform.toLowerCase().includes(s) ||
          account.username.toLowerCase().includes(s)
      );
    }

    if (platform && platform !== "All") {
      result = result.filter((account) => account.platform === platform);
    }

    switch (sortBy) {
      case "oldest":
        result.sort((a, b) => a.id - b.id);
        break;
      case "alphabetical":
        result.sort((a, b) => a.gameName.localeCompare(b.gameName));
        break;
      case "newest":
      default:
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [saved, search, platform, sortBy]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast(label, "success");
  };

  const handleRemove = (id: number) => {
    removeSaved(id);
    addToast(t("saved_empty_title"), "info");
  };

  return (
    <div className="min-h-screen bg-[#030303]">
      <Navigation />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-[#C1272D] text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t("saved_back")}
            </Link>
            <div className="flex items-center gap-3">
              <Bookmark className="w-6 h-6 text-[#C1272D]" />
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {t("saved_title_1")} <span className="text-gradient">{t("saved_title_2")}</span>
              </h1>
            </div>
            <p className="text-white/40 text-sm mt-2">
              {saved.length} {t("saved_count")}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <SearchFilters
              search={search}
              onSearchChange={setSearch}
              platform={platform}
              onPlatformChange={setPlatform}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </motion.div>

          {saved.length > 0 ? (
            <div>
              <div className="mb-6 text-sm text-white/30">
                {filteredSaved.length} {t("vault_results")}
              </div>
              {filteredSaved.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredSaved.map((account, index) => (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card rounded-xl overflow-hidden group"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={account.imageUrl || `/games/${account.platform.toLowerCase().replace(/\s+/g, "")}.jpg`}
                      alt={account.gameName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).src = "/games/steam.jpg"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold text-white/90 border border-white/10 backdrop-blur-md bg-black/40">
                        {account.platform}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemove(account.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg mb-3 truncate">{account.gameName}</h3>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-white/40 text-xs font-mono uppercase">{t("card_user")}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white/80 text-sm font-mono truncate max-w-[140px]">{account.username}</span>
                          <button onClick={() => handleCopy(account.username, t("card_user"))} className="p-1 rounded bg-white/5 hover:bg-[#C1272D]/20 text-white/50 hover:text-[#C1272D] transition-all">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-white/40 text-xs font-mono uppercase">{t("card_pass")}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white/80 text-sm font-mono truncate max-w-[140px]">{"*".repeat(Math.min(account.password.length, 12))}</span>
                          <button onClick={() => handleCopy(account.password, t("card_pass"))} className="p-1 rounded bg-white/5 hover:bg-[#C1272D]/20 text-white/50 hover:text-[#C1272D] transition-all">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-white/20 text-xs mt-3">{t("saved_saved_on")} {new Date(account.savedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <BookmarkX className="w-16 h-16 text-white/10 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-white/40 mb-2">{t("saved_empty_title")}</h2>
                  <p className="text-white/25 text-sm mb-6 max-w-sm mx-auto">{t("saved_empty_desc")}</p>
                  <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-[#C1272D]/20 text-[#C1272D] text-sm font-medium hover:bg-[#C1272D]/10 transition-all">
                    {t("saved_browse")}
                  </Link>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <BookmarkX className="w-16 h-16 text-white/10 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white/40 mb-2">{t("saved_empty_title")}</h2>
              <p className="text-white/25 text-sm mb-6 max-w-sm mx-auto">{t("saved_empty_desc")}</p>
              <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-[#C1272D]/20 text-[#C1272D] text-sm font-medium hover:bg-[#C1272D]/10 transition-all">
                {t("saved_browse")}
              </Link>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
