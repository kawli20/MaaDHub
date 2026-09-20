import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Coins,
  Copy,
  Check,
  Share2,
  Users,
  Gift,
  Sparkles,
  History,
  ArrowRight,
  ExternalLink,
  Lock,
} from "lucide-react";
import { usePoints } from "@/hooks/usePoints";
import { useLanguage } from "@/hooks/useLanguage";

interface PointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBrowseVault?: () => void;
}

export function PointsModal({ isOpen, onClose, onBrowseVault }: PointsModalProps) {
  const {
    points,
    referralCode,
    invitedCount,
    pointsEarnedFromInvites,
    history,
    getInviteLink,
  } = usePoints();
  const { t } = useLanguage();

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"invite" | "history">("invite");

  const inviteUrl = getInviteLink();

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🔥 Get free premium gaming accounts on MaaDHub! Use my invite link to get +10 bonus points: ${inviteUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleShareTelegram = () => {
    const text = encodeURIComponent(
      `🎮 Join MaaDHub and claim free premium gaming accounts! Use my invite link for +10 bonus points:`
    );
    window.open(`https://t.me/share/url?url=${encodeURIComponent(inviteUrl)}&text=${text}`, "_blank");
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(
      `Get free access to premium gaming accounts on MaaDHub! Join with my invite link to get 10 free bonus points: ${inviteUrl}`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "MaaDHub Free Gaming Accounts",
          text: "Join MaaDHub to get free premium gaming accounts! Get +10 bonus points with my invite link:",
          url: inviteUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopyLink();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#080d16]/98 p-6 sm:p-8 text-white shadow-2xl overflow-hidden"
        >
          {/* Subtle Ambient Red Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#C1272D]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="relative flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400/20 to-[#C1272D]/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Points & Invite Hub</h3>
                <p className="text-xs text-white/50">Unlock exclusive accounts & earn rewards</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Points Balance Card */}
          <div className="mt-5 p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#C1272D]/15 to-transparent border border-amber-500/30 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Your Balance
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-extrabold text-white font-mono tracking-tight text-gradient-gold">
                    {points}
                  </span>
                  <span className="text-sm font-semibold text-white/60">Points</span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/15 backdrop-blur-sm">
                  50 Starting Points
                </span>
                <p className="text-[10px] text-white/40 mt-1">Ready to unlock accounts</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            <button
              onClick={() => setActiveTab("invite")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "invite"
                  ? "bg-[#C1272D] text-white shadow-md shadow-[#C1272D]/20"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              Invite & Earn (+10 pts)
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "history"
                  ? "bg-[#C1272D] text-white shadow-md shadow-[#C1272D]/20"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              Points History
            </button>
          </div>

          {/* TAB 1: INVITE & EARN */}
          {activeTab === "invite" && (
            <div className="mt-5 space-y-4">
              {/* How it works banner */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">How Invitations Work</h4>
                    <p className="text-[11px] text-white/60 mt-0.5 leading-relaxed">
                      Share your unique invite link with friends. When they visit and sign up,{" "}
                      <span className="text-emerald-400 font-semibold">they get +10 bonus points</span> and{" "}
                      <span className="text-amber-300 font-semibold">you get +10 points</span> instantly!
                    </p>
                  </div>
                </div>
              </div>

              {/* Referral Link Box */}
              <div>
                <label className="block text-[11px] font-medium text-white/50 mb-1.5 font-mono uppercase tracking-wider">
                  Your Referral Link
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/90 truncate select-all">
                    {inviteUrl}
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2.5 rounded-xl bg-[#C1272D] hover:bg-[#d92d34] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 shadow-lg shadow-[#C1272D]/20"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Share Buttons */}
              <div>
                <span className="block text-[11px] font-medium text-white/50 mb-2">Share Directly:</span>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={handleShareWhatsApp}
                    className="py-2.5 px-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-emerald-500/20 hover:border-emerald-500/30 text-xs font-medium text-white/80 hover:text-emerald-300 transition-all flex flex-col items-center justify-center gap-1"
                  >
                    <span className="text-sm font-bold text-emerald-400">WA</span>
                    <span className="text-[10px]">WhatsApp</span>
                  </button>
                  <button
                    onClick={handleShareTelegram}
                    className="py-2.5 px-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-sky-500/20 hover:border-sky-500/30 text-xs font-medium text-white/80 hover:text-sky-300 transition-all flex flex-col items-center justify-center gap-1"
                  >
                    <span className="text-sm font-bold text-sky-400">TG</span>
                    <span className="text-[10px]">Telegram</span>
                  </button>
                  <button
                    onClick={handleShareTwitter}
                    className="py-2.5 px-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-blue-500/20 hover:border-blue-500/30 text-xs font-medium text-white/80 hover:text-blue-300 transition-all flex flex-col items-center justify-center gap-1"
                  >
                    <span className="text-sm font-bold text-blue-400">X</span>
                    <span className="text-[10px]">Twitter</span>
                  </button>
                  <button
                    onClick={handleNativeShare}
                    className="py-2.5 px-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-purple-500/20 hover:border-purple-500/30 text-xs font-medium text-white/80 hover:text-purple-300 transition-all flex flex-col items-center justify-center gap-1"
                  >
                    <Share2 className="w-4 h-4 text-purple-400" />
                    <span className="text-[10px]">More</span>
                  </button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <span className="text-xs text-white/40 block mb-0.5">Friends Invited</span>
                  <span className="text-lg font-bold text-white font-mono">{invitedCount}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <span className="text-xs text-white/40 block mb-0.5">Points Earned</span>
                  <span className="text-lg font-bold text-amber-400 font-mono">+{pointsEarnedFromInvites}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HISTORY */}
          {activeTab === "history" && (
            <div className="mt-5 space-y-2 max-h-64 overflow-y-auto pr-1">
              {history && history.length > 0 ? (
                history.map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                  >
                    <div>
                      <p className="text-xs font-semibold text-white/90">{tx.title}</p>
                      <p className="text-[10px] text-white/40 font-mono mt-0.5">
                        {new Date(tx.timestamp).toLocaleDateString()} at{" "}
                        {new Date(tx.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-bold font-mono px-2.5 py-1 rounded-lg ${
                        tx.pointsDelta > 0
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                          : "bg-red-500/15 text-red-400 border border-red-500/25"
                      }`}
                    >
                      {tx.pointsDelta > 0 ? `+${tx.pointsDelta}` : tx.pointsDelta} PTS
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-white/30 text-xs">
                  No points activity recorded yet.
                </div>
              )}
            </div>
          )}

          {/* Footer Action */}
          <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
            <span className="text-[11px] text-white/40">
              Need more points? Keep inviting friends!
            </span>
            <button
              onClick={() => {
                onClose();
                onBrowseVault?.();
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              Browse Accounts
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
