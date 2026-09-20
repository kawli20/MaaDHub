import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { RecentlyViewedAccount } from "@/hooks/useRecentlyViewed";

interface RecentlyViewedStripProps {
  recent: RecentlyViewedAccount[];
  onClear: () => void;
  onRemove: (id: number) => void;
  onSelect: (id: number) => void;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function RecentlyViewedStrip({
  recent,
  onClear,
  onRemove,
  onSelect,
}: RecentlyViewedStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!recent || recent.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -220 : 220, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4 }}
        className="relative px-4 sm:px-6 lg:px-8 pb-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/50">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-semibold text-white/70 tracking-tight">
                Recently Viewed
              </span>
              <span className="text-[10px] text-white/30 font-mono bg-white/[0.04] border border-white/[0.06] px-1.5 py-0.5 rounded-full">
                {recent.length}
              </span>
            </div>
            <button
              onClick={onClear}
              className="text-[10px] text-white/30 hover:text-[#C1272D] transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-[#C1272D]/10"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          </div>

          {/* Scroll Container */}
          <div className="relative group/strip">
            {/* Left Arrow */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-8 h-8 rounded-full bg-[#030303]/90 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 opacity-0 group-hover/strip:opacity-100 transition-all shadow-lg"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Cards */}
            <div
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide pb-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {recent.slice(0, 12).map((account, i) => (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="relative flex-shrink-0 w-[140px] group/card cursor-pointer"
                  onClick={() => onSelect(account.id)}
                >
                  {/* Thumbnail */}
                  <div className="relative w-full h-[100px] rounded-xl overflow-hidden bg-[#07090e] border border-white/[0.06] group-hover/card:border-[#C1272D]/40 transition-all">
                    <img
                      src={account.imageUrl}
                      alt={account.gameName}
                      className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-300"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/games/steam.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 to-transparent" />

                    {/* Remove button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(account.id);
                      }}
                      className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-black/80 opacity-0 group-hover/card:opacity-100 transition-all"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>

                    {/* Platform badge */}
                    <div className="absolute bottom-1.5 left-1.5">
                      <span className="text-[9px] font-semibold text-white/60 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
                        {account.platform}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-1.5 px-0.5">
                    <p className="text-white/80 text-[11px] font-semibold truncate leading-tight group-hover/card:text-[#C1272D] transition-colors">
                      {account.gameName}
                    </p>
                    <p className="text-white/30 text-[10px] mt-0.5 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 shrink-0" />
                      {timeAgo(account.viewedAt)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-8 h-8 rounded-full bg-[#030303]/90 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 opacity-0 group-hover/strip:opacity-100 transition-all shadow-lg"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
