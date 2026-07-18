import { motion } from "framer-motion";
import { Copy, Check, Bookmark, BookmarkCheck, ExternalLink } from "lucide-react";
import { memo, useState, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Account } from "@/data/accounts";

interface AccountCardProps {
  account: Account;
  isSaved: boolean;
  onToggleSave: (account: Account) => void;
  onCopy: (text: string, label: string) => void;
  index?: number;
}

const platformColors: Record<string, string> = {
  Steam: "#1b2838",
  "Epic Games": "#2a2a2a",
  Ubisoft: "#1a1a2e",
  EA: "#1a0a00",
  "Battle.net": "#001a2e",
  "Riot Games": "#2e0010",
  "Rockstar Games": "#1a1a00",
  Xbox: "#0a1a0a",
  PlayStation: "#000a1a",
  Origin: "#1a0a1a",
  GOG: "#1a0a2e",
  Netflix: "#1a0000",
  Crunchyroll: "#1a1000",
  Amazon: "#0a0a1a",
  Spotify: "#0a1a0a",
  Discord: "#0a0a2e",
  Other: "#1a1a1a",
};

const PLATFORM_FALLBACK_IMAGE: Record<string, string> = {
  Steam: "/games/steam.jpg",
  "Epic Games": "/games/epic.jpg",
  Xbox: "/games/xbox.jpg",
  PlayStation: "/games/playstation.jpg",
  Netflix: "/games/netflix.jpg",
  Spotify: "/games/spotify.jpg",
  Ubisoft: "/games/ubisoft.jpg",
  EA: "/games/ea.jpg",
  "Riot Games": "/games/riot.jpg",
  "Battle.net": "/games/battlenet.jpg",
};

export const AccountCard = memo(function AccountCard({ account, isSaved, onToggleSave, onCopy, index = 0 }: AccountCardProps) {
  const { t } = useLanguage();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    onCopy(text, label);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fallbackImage = PLATFORM_FALLBACK_IMAGE[account.platform] || "/games/steam.jpg";
  const imageUrl = account.imageUrl.startsWith("http") ? account.imageUrl : fallbackImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative rounded-xl overflow-hidden glass-card hover-glow cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Skeleton placeholder shown while image loads */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-white/5 animate-pulse" />
        )}
        <motion.img
          ref={imgRef}
          src={imageUrl}
          alt={account.gameName}
          loading="lazy"
          decoding="async"
          width={400}
          height={533}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.4 }}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = fallbackImage;
            setImgLoaded(true);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/30 to-transparent" />

        <div className="absolute top-3 left-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold text-white/90 border border-white/10 backdrop-blur-md"
            style={{ backgroundColor: `${platformColors[account.platform] || "#1a1a1a"}cc` }}
          >
            {account.platform}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(account);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/70 hover:text-[#C1272D] hover:border-[#C1272D]/30 transition-all duration-300"
        >
          {isSaved ? (
            <BookmarkCheck className="w-4 h-4 text-[#C1272D]" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </button>

        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4"
          animate={{ y: isHovered ? 0 : 5 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-white font-bold text-lg mb-1 truncate">
            {account.gameName}
          </h3>

          <div className="space-y-1.5 mt-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-white/40 text-xs font-mono uppercase tracking-wider">
                {t("card_user")}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-white/80 text-sm font-mono truncate max-w-[140px]">
                  {account.username}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(account.username, t("card_user"));
                  }}
                  className="p-1 rounded-md bg-white/5 hover:bg-[#C1272D]/20 text-white/50 hover:text-[#C1272D] transition-all"
                >
                  {copiedField === t("card_user") ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-white/40 text-xs font-mono uppercase tracking-wider">
                {t("card_pass")}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-white/80 text-sm font-mono truncate max-w-[140px]">
                  {"*".repeat(Math.min(account.password.length, 12))}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(account.password, t("card_pass"));
                  }}
                  className="p-1 rounded-md bg-white/5 hover:bg-[#C1272D]/20 text-white/50 hover:text-[#C1272D] transition-all"
                >
                  {copiedField === t("card_pass") ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {account.supportLink && (
            <a
              href={account.supportLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-3 flex items-center gap-1.5 text-xs text-[#C1272D]/70 hover:text-[#C1272D] transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              {t("card_support")}
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
});
