import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { PLATFORMS } from "@/data/accounts";

interface SearchFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  platform: string;
  onPlatformChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function SearchFilters({
  search,
  onSearchChange,
  platform,
  onPlatformChange,
  sortBy,
  onSortChange,
}: SearchFiltersProps) {
  const { t } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder={t("vault_search_placeholder")}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/25 focus:outline-none focus:border-[#C1272D]/40 focus:ring-1 focus:ring-[#C1272D]/20 transition-all text-sm"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-white/30 hover:text-white/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all ${
            showFilters
              ? "border-[#C1272D]/40 bg-[#C1272D]/10 text-[#C1272D]"
              : "border-white/[0.08] bg-white/[0.03] text-white/50 hover:text-white/80"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          {t("vault_filters")}
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row gap-3 pb-2">
              <div className="flex-1">
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                  {t("vault_platform")}
                </label>
                <select
                  value={platform}
                  onChange={(e) => onPlatformChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#C1272D]/40 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                  }}
                >
                  <option value="All" className="bg-[#1a1a2e]">{t("vault_all_platforms")}</option>
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p} className="bg-[#1a1a2e]">{p}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">
                  {t("vault_sort_by")}
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm focus:outline-none focus:border-[#C1272D]/40 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                  }}
                >
                  <option value="newest" className="bg-[#1a1a2e]">{t("vault_sort_newest")}</option>
                  <option value="oldest" className="bg-[#1a1a2e]">{t("vault_sort_oldest")}</option>
                  <option value="alphabetical" className="bg-[#1a1a2e]">{t("vault_sort_alphabetical")}</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
