import { useMemo, useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { useSavedAccounts } from "@/hooks/useSavedAccounts";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/Toast";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SearchFilters } from "@/components/SearchFilters";
import { AccountCard } from "@/components/AccountCard";
import { BookmarkX, ArrowLeft, Bookmark, Lock, Sparkles } from "lucide-react";
import { useAuth, SignInButton, SignUpButton } from "@/lib/clerk";

const ITEMS_PER_PAGE = 12;

export default function SavedAccounts() {
  const { t } = useLanguage();
  const { isSignedIn } = useAuth();
  const { saved, toggleSave } = useSavedAccounts();
  const { toasts, addToast, removeToast } = useToast();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [platform, setPlatform] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSaved = useMemo(() => {
    let result = [...(saved || [])];

    if (debouncedSearch) {
      const s = debouncedSearch.toLowerCase().trim();
      result = result.filter(
        (account) =>
          (account.gameName || "").toLowerCase().includes(s) ||
          (account.platform || "").toLowerCase().includes(s) ||
          (account.username || "").toLowerCase().includes(s)
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
        result.sort((a, b) => (a.gameName || "").localeCompare(b.gameName || ""));
        break;
      case "newest":
      default:
        result.sort((a, b) => b.id - a.id);
        break;
    }

    return result;
  }, [saved, debouncedSearch, platform, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, platform, sortBy]);

  const totalPages = Math.ceil(filteredSaved.length / ITEMS_PER_PAGE) || 1;
  const paginatedSaved = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredSaved.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredSaved, currentPage]);

  const handleCopy = (_text: string, label: string) => {
    if (label) addToast(label, "success");
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Top Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/40 hover:text-[#C1272D] text-xs mb-5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("saved_back")}
            </Link>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-[#C1272D]/10 border border-[#C1272D]/20 flex items-center justify-center text-[#C1272D]">
                <Bookmark className="w-5 h-5" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {t("saved_title_1")} <span className="text-gradient">{t("saved_title_2")}</span>
              </h1>
            </div>

            <p className="text-white/40 text-xs mt-1">
              {saved.length} {t("saved_count")}
            </p>
          </motion.div>

          {/* Not signed in notice banner */}
          {!isSignedIn && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-5 rounded-2xl bg-[#C1272D]/10 border border-[#C1272D]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C1272D]/20 text-[#C1272D] flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Create an account to unlock full access</h4>
                  <p className="text-xs text-white/50">
                    Sign in to save posts, sync your favorite accounts across devices, and copy login credentials.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <SignInButton className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10" />
                <SignUpButton className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#C1272D] hover:bg-[#C1272D]/90" />
              </div>
            </motion.div>
          )}

          {/* Filters if there are saved items */}
          {saved.length > 0 && (
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
          )}

          {saved.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-6 text-xs text-white/40">
                <div>
                  <span className="text-white/70 font-semibold">{filteredSaved.length}</span> {t("vault_results")}
                </div>
              </div>

              {filteredSaved.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                    {paginatedSaved.map((account, index) => (
                      <AccountCard
                        key={account.id}
                        account={account}
                        isSaved={true}
                        onToggleSave={toggleSave}
                        onCopy={handleCopy}
                        index={index}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-1.5 mt-8">
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => {
                            setCurrentPage(i + 1);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`w-9 h-9 rounded-xl text-xs font-semibold transition-all ${
                            currentPage === i + 1
                              ? "bg-[#C1272D] text-white shadow-md shadow-[#C1272D]/30 border border-[#C1272D]"
                              : "text-white/60 hover:text-white hover:bg-white/5 border border-white/10"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 glass-panel rounded-3xl border border-white/[0.06] p-8">
                  <BookmarkX className="w-12 h-12 text-white/10 mx-auto mb-3" />
                  <h3 className="text-base font-semibold text-white/50 mb-1">No matching saved accounts</h3>
                  <p className="text-white/30 text-xs mb-4">Try clearing filters or search query</p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setPlatform("All");
                    }}
                    className="px-4 py-2 rounded-xl bg-[#C1272D]/15 text-[#C1272D] text-xs font-medium border border-[#C1272D]/30"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 glass-panel rounded-3xl border border-white/[0.06] p-8"
            >
              <BookmarkX className="w-16 h-16 text-white/10 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white/50 mb-2">{t("saved_empty_title")}</h2>
              <p className="text-white/30 text-xs mb-6 max-w-sm mx-auto">{t("saved_empty_desc")}</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C1272D] text-white text-xs font-semibold shadow-lg shadow-[#C1272D]/20 hover:bg-[#C1272D]/90 transition-all"
              >
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
