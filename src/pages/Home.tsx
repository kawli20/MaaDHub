import { useState, useMemo } from "react";
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
import { FloatingParticles } from "@/components/FloatingParticles";
import { BackToTop } from "@/components/BackToTop";
import { AdBanner } from "@/components/AdBanner";
import { DEFAULT_ACCOUNTS, DEFAULT_ADVERTISEMENTS } from "@/data/accounts";
import { Gamepad2 } from "lucide-react";

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function Home() {
  const { t } = useLanguage();
  const { isSaved, toggleSave } = useSavedAccounts();
  const { toasts, addToast, removeToast } = useToast();

  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const accounts = DEFAULT_ACCOUNTS;
  const ads = DEFAULT_ADVERTISEMENTS.filter((a) => a.enabled);

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
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "alphabetical":
        result.sort((a, b) => a.gameName.localeCompare(b.gameName));
        break;
      case "newest":
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }
    return result;
  }, [accounts, search, platform, sortBy]);

  const accountChunks = chunk(filteredAccounts, 4);

  const handleCopy = (_text: string, label: string) => {
    addToast(label, "success");
  };

  return (
    <div className="min-h-screen bg-[#030303]">
      <FloatingParticles />
      <BackToTop />
      <Navigation />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <HeroSection />

      <section id="vault" className="relative py-20 px-4 sm:px-6 lg:px-8">
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
            <div className="space-y-10">
              {accountChunks.map((chunkAccounts, chunkIndex) => (
                <div key={chunkIndex} className="space-y-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {chunkAccounts.map((account, index) => (
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

                  {chunkIndex < accountChunks.length - 1 && ads.length > 0 && (
                    <AdBanner ad={ads[chunkIndex % ads.length]} index={chunkIndex} />
                  )}
                </div>
              ))}
            </div>
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
