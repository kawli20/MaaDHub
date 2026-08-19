import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { useSavedAccounts } from "@/hooks/useSavedAccounts";
import { useToast } from "@/hooks/useToast";
import { HeroSection } from "@/components/HeroSection";
import { AccountCard } from "@/components/AccountCard";
import { SearchFilters } from "@/components/SearchFilters";
import { ToastContainer } from "@/components/Toast";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { AdBanner } from "@/components/AdBanner";
import { DEFAULT_ACCOUNTS, DEFAULT_ADVERTISEMENTS } from "@/data/accounts";
import { Gamepad2, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const { t } = useLanguage();
  const { isSaved, toggleSave } = useSavedAccounts();
  const { toasts, addToast, removeToast } = useToast();

  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const accounts = DEFAULT_ACCOUNTS;
  const ads = DEFAULT_ADVERTISEMENTS.filter((a) => a.enabled).sort((a, b) => b.id - a.id);

  const filteredAccounts = useMemo(() => {
    let result = [...accounts];
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.gameName.toLowerCase().includes(s) ||
          a.platform.toLowerCase().includes(s) ||
          a.username.toLowerCase().includes(s)
      );
    }
    if (platform && platform !== "All") {
      result = result.filter((a) => a.platform === platform);
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
  }, [accounts, search, platform, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, platform, sortBy]);

  const totalPages = Math.ceil(filteredAccounts.length / ITEMS_PER_PAGE);
  const paginatedAccounts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAccounts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAccounts, currentPage]);

  const currentAdIndex = (currentPage - 1) % Math.max(ads.length, 1);

  const handleCopy = (_text: string, label: string) => {
    addToast(label, "success");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const vaultSection = document.getElementById("vault");
    if (vaultSection) {
      vaultSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <BackToTop />
      <Navigation />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <HeroSection />

      <section id="vault" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none bg-gradient-to-b from-[#030303] via-[#030303]/60 to-transparent -mt-1" />
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Gamepad2 className="w-6 h-6 text-[#C1272D]" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {t("vault_title_1") ? <>{t("vault_title_1")} </> : null}
                <span className="text-gradient">{t("vault_title_2")}</span>
              </h2>
            </div>
            <p className="text-white/40 text-sm max-w-lg">
              {t("vault_description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <SearchFilters
              search={search}
              onSearchChange={setSearch}
              platform={platform}
              onPlatformChange={setPlatform}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </motion.div>

          <div className="mb-6 text-sm text-white/30">
            {filteredAccounts.length} {t("vault_results")}
          </div>

          {filteredAccounts.length > 0 ? (
            <>
              {ads.length > 0 && (
                <div className="mb-10">
                  <AdBanner ad={ads[currentAdIndex]} index={currentPage} />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                {paginatedAccounts.map((account, index) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    isSaved={isSaved(account.id)}
                    onToggleSave={toggleSave}
                    onCopy={handleCopy}
                    index={index}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-2 mt-8"
                >
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed text-white/60 hover:text-white hover:bg-white/5 border border-white/10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum: number;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                            currentPage === pageNum
                              ? "bg-[#C1272D] text-white"
                              : "text-white/60 hover:text-white hover:bg-white/5 border border-white/10"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed text-white/60 hover:text-white hover:bg-white/5 border border-white/10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Gamepad2 className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white/40 mb-2">
                {t("vault_empty_title")}
              </h3>
              <p className="text-white/25 text-sm">{t("vault_empty_desc")}</p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
