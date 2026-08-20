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

  const hasActiveFilters = platform !== "All" || sortBy !== "newest";

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search input with 300ms debounce support */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder={t("vault_search_placeholder")}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/25 focus:outline-none focus:border-[#C1272D]/50 focus:ring-1 focus:ring-[#C1272D]/30 transition-all text-sm backdrop-blur-xl"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border text-sm font-medium transition-all backdrop-blur-xl ${
            showFilters || hasActiveFilters
              ? "border-[#C1272D]/50 bg-[#C1272D]/10 text-[#C1272D]"
              : "border-white/[0.08] bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{t("vault_filters")}</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-[#C1272D] animate-pulse" />
          )}
        </button>
      </div>

      {/* Expanded Filter Selects */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md">
              {/* Platform Selector */}
              <div>
                <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-1.5">
                  {t("vault_platform")}
                </label>
                <select
                  value={platform}
                  onChange={(e) => onPlatformChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080d16] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-[#C1272D]/60 cursor-pointer"
                >
                  <option value="All">{t("vault_all_platforms")}</option>
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Selector */}
              <div>
                <label className="block text-[11px] font-mono text-white/40 uppercase tracking-wider mb-1.5">
                  {t("vault_sort_by")}
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#080d16] border border-white/[0.1] text-white text-xs focus:outline-none focus:border-[#C1272D]/60 cursor-pointer"
                >
                  <option value="newest">{t("vault_sort_newest")}</option>
                  <option value="oldest">{t("vault_sort_oldest")}</option>
                  <option value="alphabetical">{t("vault_sort_alphabetical")}</option>
                </select>
              </div>

              {/* Reset Filters button */}
              <div className="sm:col-span-2 lg:col-span-1 flex items-end">
                <button
                  onClick={() => {
                    onPlatformChange("All");
                    onSortChange("newest");
                    onSearchChange("");
                  }}
                  className="w-full py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-xs font-medium transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
