import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Flag,
  Share2,
  X,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { memo, useState, useRef, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useReportedAccounts } from "@/hooks/useReportedAccounts";
import { reportBrokenAccount } from "@/lib/telegram";
import { useAuth } from "@/lib/clerk";
import type { Account } from "@/data/accounts";

interface AccountCardProps {
  account: Account;
  isSaved: boolean;
  onToggleSave: (account: Account) => void;
  onCopy: (text: string, label: string) => void;
  index?: number;
  isHighlighted?: boolean;
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
  Instagram: "#2e001a",
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

const PRESET_REPORT_REASONS = [
  "Password incorrect or changed",
  "2FA / Email code required",
  "Account banned or suspended",
  "Game missing in account library",
  "Cannot log in / other issue",
];

export const AccountCard = memo(function AccountCard({
  account,
  isSaved,
  onToggleSave,
  onCopy,
  index = 0,
  isHighlighted = false,
}: AccountCardProps) {
  const { t } = useLanguage();
  const { isSignedIn, openSignIn } = useAuth();
  const { isReported, markReported } = useReportedAccounts();

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Report Modal
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [reporting, setReporting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const reported = isReported(account.id);

  // Lazy loading observer
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px", threshold: 0.01 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const requireAuthAction = (callback: () => void, actionName: string) => {
    if (!isSignedIn) {
      onCopy("", `Please sign in or create an account to ${actionName}`);
      openSignIn();
      return;
    }
    callback();
  };

  const handleCopy = (text: string, label: string) => {
    requireAuthAction(() => {
      if (!text) return;
      navigator.clipboard?.writeText(text);
      onCopy(text, label);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 2000);
    }, `copy ${label.toLowerCase()}`);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    requireAuthAction(() => {
      onToggleSave(account);
    }, "save accounts to your vault");
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/?account=${account.id}`;
    const shareData = {
      title: `${account.gameName} - Free ${account.platform} Account`,
      text: `Get free access to ${account.gameName} on MaaDHub!`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        onCopy(shareUrl, "Shared successfully!");
      } catch {
        // Fallback
      }
    } else {
      navigator.clipboard?.writeText(shareUrl);
      onCopy(shareUrl, "Link copied to clipboard!");
    }
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalReason = [reportReason, customReason.trim()].filter(Boolean).join(" - ");
    setReporting(true);

    const success = await reportBrokenAccount({
      accountId: account.id,
      gameName: account.gameName,
      platform: account.platform,
      username: account.username,
      reason: finalReason || "Account reported as broken",
    });

    setReporting(false);
    if (success) {
      markReported(account.id);
      setReportSuccess(true);
      onCopy("", "Report submitted to admin!");
      setTimeout(() => {
        setShowReportModal(false);
        setReportSuccess(false);
        setReportReason("");
        setCustomReason("");
      }, 1200);
    } else {
      markReported(account.id);
      onCopy("", "Report saved locally!");
      setShowReportModal(false);
    }
  };

  const fallbackImage = PLATFORM_FALLBACK_IMAGE[account.platform] || "/games/steam.jpg";
  const imageBaseUrl =
    account.imageUrl && account.imageUrl.startsWith("http")
      ? account.imageUrl
      : fallbackImage;
  const optimizedImageUrl = imgError ? fallbackImage : shouldLoad ? imageBaseUrl : "";

  return (
    <>
      <motion.div
        id={`account-${account.id}`}
        ref={containerRef}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`group relative rounded-2xl overflow-hidden glass-card cursor-pointer transition-all duration-300 ${
          isHighlighted
            ? "ring-2 ring-[#C1272D] shadow-[0_0_30px_rgba(193,39,45,0.4)]"
            : "hover:border-[#C1272D]/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        }`}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-[#07090e]">
          {/* Shimmer Placeholder */}
          {!imgLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-white/[0.04] animate-pulse" />
          )}

          {shouldLoad && (
            <motion.img
              src={optimizedImageUrl}
              alt={account.gameName}
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              animate={{ scale: isHovered ? 1.06 : 1 }}
              transition={{ duration: 0.4 }}
              onLoad={() => setImgLoaded(true)}
              onError={() => {
                setImgError(true);
                setImgLoaded(true);
              }}
            />
          )}

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent" />

          {/* Platform Badge */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <span
              className="px-3 py-1 rounded-full text-[11px] font-semibold text-white/90 border border-white/10 backdrop-blur-md shadow-sm"
              style={{
                backgroundColor: `${platformColors[account.platform] || "#1a1a1a"}cc`,
              }}
            >
              {account.platform}
            </span>

            {reported && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                <AlertTriangle className="w-3 h-3" />
                Reported
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            {/* Share */}
            <button
              onClick={handleShare}
              title="Share Account"
              className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            {/* Report Broken */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowReportModal(true);
              }}
              title="Report Broken Account"
              className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                reported
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                  : "bg-black/50 text-white/70 border-white/10 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10"
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
            </button>

            {/* Bookmark (Gated by Clerk Auth) */}
            <button
              onClick={handleBookmark}
              title={
                !isSignedIn
                  ? "Sign in to save account"
                  : isSaved
                  ? "Remove from Saved"
                  : "Save Account"
              }
              className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                !isSignedIn
                  ? "bg-black/50 text-white/50 border-white/10 hover:text-[#C1272D] hover:border-[#C1272D]/40"
                  : isSaved
                  ? "bg-[#C1272D]/20 text-[#C1272D] border-[#C1272D]/40"
                  : "bg-black/50 text-white/70 border-white/10 hover:text-[#C1272D] hover:border-[#C1272D]/30"
              }`}
            >
              {isSaved ? (
                <BookmarkCheck className="w-3.5 h-3.5 text-[#C1272D]" />
              ) : !isSignedIn ? (
                <Bookmark className="w-3.5 h-3.5 opacity-60" />
              ) : (
                <Bookmark className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Bottom Card Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <h3
              className="text-white font-bold text-base sm:text-lg mb-2.5 truncate"
              title={account.gameName}
            >
              {account.gameName}
            </h3>

            <div className="space-y-1.5">
              {/* Username row */}
              <div className="flex items-center justify-between gap-2 bg-white/[0.04] p-1.5 px-2.5 rounded-lg border border-white/[0.05]">
                <span className="text-white/40 text-[11px] font-mono uppercase tracking-wider">
                  {t("card_user")}
                </span>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-white/90 text-xs font-mono truncate max-w-[130px]">
                    {account.username}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(account.username, t("card_user"));
                    }}
                    className={`p-1 rounded-md transition-all ${
                      !isSignedIn
                        ? "text-white/40 hover:text-amber-400 hover:bg-amber-500/10"
                        : "hover:bg-white/10 text-white/50 hover:text-[#C1272D]"
                    }`}
                    title={!isSignedIn ? "Sign in to copy username" : "Copy Username"}
                  >
                    {copiedField === t("card_user") ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : !isSignedIn ? (
                      <Lock className="w-3 h-3 text-amber-400/80" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password row */}
              <div className="flex items-center justify-between gap-2 bg-white/[0.04] p-1.5 px-2.5 rounded-lg border border-white/[0.05]">
                <span className="text-white/40 text-[11px] font-mono uppercase tracking-wider">
                  {t("card_pass")}
                </span>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-white/90 text-xs font-mono truncate max-w-[130px]">
                    {"*".repeat(Math.min((account.password || "").length, 10))}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(account.password, t("card_pass"));
                    }}
                    className={`p-1 rounded-md transition-all ${
                      !isSignedIn
                        ? "text-white/40 hover:text-amber-400 hover:bg-amber-500/10"
                        : "hover:bg-white/10 text-white/50 hover:text-[#C1272D]"
                    }`}
                    title={!isSignedIn ? "Sign in to copy password" : "Copy Password"}
                  >
                    {copiedField === t("card_pass") ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : !isSignedIn ? (
                      <Lock className="w-3 h-3 text-amber-400/80" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Support Link */}
            {account.supportLink && (
              <a
                href={account.supportLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#C1272D]/80 hover:text-[#C1272D] transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                {t("card_support")}
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* REPORT BROKEN ACCOUNT MODAL */}
      <AnimatePresence>
        {showReportModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setShowReportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="w-full max-w-md glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl bg-[#080d16]/95"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                    <Flag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Report Broken Account</h3>
                    <p className="text-xs text-white/40">{account.gameName} ({account.platform})</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {reportSuccess ? (
                <div className="py-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-6 h-6" />
                  </div>
                  <p className="text-white font-semibold">Report Sent to Admin</p>
                  <p className="text-xs text-white/40 mt-1">Thank you for reporting this account!</p>
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-2">
                      Select what is wrong:
                    </label>
                    <div className="space-y-1.5">
                      {PRESET_REPORT_REASONS.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setReportReason(r)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                            reportReason === r
                              ? "border-[#C1272D] bg-[#C1272D]/15 text-white"
                              : "border-white/[0.08] bg-white/[0.02] text-white/70 hover:bg-white/[0.05]"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/60 mb-1.5">
                      Additional details (optional):
                    </label>
                    <textarea
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      placeholder="e.g., Code requested at 19:30 UTC..."
                      rows={2}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder:text-white/30 outline-none focus:border-[#C1272D]/60"
                    />
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowReportModal(false)}
                      className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={reporting}
                      className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-lg shadow-red-900/30 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                      {reporting ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Submit Report"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
});
