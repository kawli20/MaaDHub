import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import type { Toast as ToastType } from "@/hooks/useToast";

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const colors = {
  success: "text-[#006233] border-[#006233]/30 bg-[#006233]/10",
  error: "text-[#C1272D] border-[#C1272D]/30 bg-[#C1272D]/10",
  info: "text-[#C1272D]/80 border-[#C1272D]/20 bg-[#C1272D]/5",
};

export function ToastContainer({ toasts, onRemove }: { toasts: ToastType[]; onRemove: (id: number) => void }) {
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl ${colors[toast.type]} min-w-[280px]`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-sm font-medium flex-1">{toast.message}</span>
              <button
                onClick={() => onRemove(toast.id)}
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
