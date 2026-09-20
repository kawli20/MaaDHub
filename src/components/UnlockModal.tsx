import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Lock,
  Unlock,
  Coins,
  Sparkles,
  AlertTriangle,
  Gift,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { usePoints } from "@/hooks/usePoints";
import { useAuth } from "@/lib/clerk";
import type { Account } from "@/data/accounts";

interface UnlockModalProps {
  account: Account | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (account: Account) => void;
  onOpenInviteModal?: () => void;
}

export function UnlockModal({
  account,
  isOpen,
  onClose,
  onSuccess,
  onOpenInviteModal,
}: UnlockModalProps) {
  const { points, unlockAccount } = usePoints();
  const { isSignedIn, openSignIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [unlockedSuccess, setUnlockedSuccess] = useState(false);

  if (!isOpen || !account) return null;

  const cost = account.pointsCost || 10;
  const hasEnoughPoints = points >= cost;
  const balanceAfter = Math.max(0, points - cost);

  const handleConfirmUnlock = async () => {
    if (!isSignedIn) {
      openSignIn();
      return;
    }

    if (!hasEnoughPoints) {
      onClose();
      onOpenInviteModal?.();
      return;
    }

    setLoading(true);
    // Smooth unlock feel
    await new Promise((res) => setTimeout(res, 600));
    const result = unlockAccount(account);
    setLoading(false);

    if (result.success) {
      setUnlockedSuccess(true);
      onSuccess?.(account);
      setTimeout(() => {
        setUnlockedSuccess(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#080d16]/98 p-6 sm:p-7 text-white shadow-2xl overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-20 -right-20 w-52 h-52 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {unlockedSuccess ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-10 text-center space-y-3"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9 animate-bounce" />
              </div>
              <h3 className="text-xl font-bold text-white">Account Unlocked!</h3>
              <p className="text-xs text-white/60 max-w-xs mx-auto">
                Credentials for <span className="text-white font-semibold">{account.gameName}</span> are now revealed and ready to copy.
              </p>
            </motion.div>
          ) : (
            <>
              {/* Header Badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Unlock VIP Account</h3>
                  <p className="text-[11px] text-white/40">Use your points to get instant access</p>
                </div>
              </div>

              {/* Game Preview Card */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-3.5 mb-5">
                <div className="w-14 h-18 rounded-xl overflow-hidden bg-black/50 shrink-0 border border-white/10 aspect-[3/4]">
                  <img
                    src={account.imageUrl}
                    alt={account.gameName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/games/steam.jpg";
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white/80 border border-white/10 mb-1">
                    {account.platform}
                  </span>
                  <h4 className="text-sm font-bold text-white truncate" title={account.gameName}>
                    {account.gameName}
                  </h4>
                  <p className="text-[11px] text-amber-400 font-mono mt-0.5 font-semibold">
                    Cost: {cost} Points
                  </p>
                </div>
              </div>

              {/* Points Calculation */}
              <div className="p-4 rounded-2xl bg-[#03060a] border border-white/[0.06] space-y-2.5 mb-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">Your Current Points</span>
                  <span className="font-mono font-bold text-white">{points} PTS</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50">Unlock Cost</span>
                  <span className="font-mono font-bold text-amber-400">-{cost} PTS</span>
                </div>
                <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs">
                  <span className="font-semibold text-white/80">Balance After Unlock</span>
                  <span
                    className={`font-mono font-bold ${
                      hasEnoughPoints ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {balanceAfter} PTS
                  </span>
                </div>
              </div>

              {/* Insufficient Points Warning */}
              {!hasEnoughPoints && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 mb-5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-200/90 leading-relaxed">
                    You need <span className="font-bold text-white">{cost - points} more points</span> to unlock this account. Invite a friend to earn +10 points instantly!
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-2">
                {hasEnoughPoints ? (
                  <button
                    onClick={handleConfirmUnlock}
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C1272D] to-[#e63946] hover:from-[#d92d34] hover:to-[#ff4d5a] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#C1272D]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Unlocking...
                      </>
                    ) : (
                      <>
                        <Unlock className="w-4 h-4" />
                        Confirm & Unlock ({cost} Points)
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenInviteModal?.();
                    }}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Gift className="w-4 h-4" />
                    Invite Friends & Get +10 Points
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl text-xs font-medium text-white/50 hover:text-white hover:bg-white/5 transition-colors text-center"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
