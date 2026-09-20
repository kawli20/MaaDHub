import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowLeft, Gamepad2, Send, Sparkles } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/Toast";
import { sendToTelegram } from "@/lib/telegram";

export default function Requests() {
  const { t } = useLanguage();
  const { toasts, addToast, removeToast } = useToast();

  const [gameName, setGameName] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedGame = gameName.trim();
    const trimmedNote = note.trim();

    if (!trimmedGame) {
      addToast(t("requests_missing_game"), "error");
      return;
    }

    setSubmitting(true);

    const message = [
      `🎮 <b>NEW GAME REQUEST</b>`,
      ``,
      `🕹️ <b>Game:</b> <code>${trimmedGame}</code>`,
      trimmedNote ? `📝 <b>Note:</b> <i>${trimmedNote}</i>` : "",
      `⏰ <b>Requested At:</b> ${new Date().toLocaleString()}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const ok = await sendToTelegram(message);
      if (ok) {
        setGameName("");
        setNote("");
        addToast(t("requests_sent"), "success");
      } else {
        addToast(t("requests_failed"), "error");
      }
    } catch {
      addToast(t("requests_failed"), "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/40 hover:text-[#C1272D] text-xs mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("saved_back")}
            </Link>

            <div className="flex flex-col gap-2 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C1272D]/20 bg-[#C1272D]/10 text-[#C1272D] text-xs w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                {t("requests_badge")}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {t("requests_title_1")} <span className="text-gradient">{t("requests_title_2")}</span>
              </h1>
              <p className="text-white/40 text-xs sm:text-sm max-w-xl">{t("requests_desc")}</p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] bg-[#080d16]/90 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#C1272D]/10 border border-[#C1272D]/20 flex items-center justify-center text-[#C1272D]">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{t("requests_form_title")}</h2>
                <p className="text-xs text-white/40">{t("requests_form_desc")}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2">
                  {t("requests_game_label")} *
                </label>
                <input
                  value={gameName}
                  onChange={(event) => setGameName(event.target.value)}
                  placeholder={t("requests_game_placeholder")}
                  className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#C1272D]/60 focus:bg-white/[0.05] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2">
                  {t("requests_note_label")}
                </label>
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder={t("requests_note_placeholder")}
                  rows={4}
                  className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#C1272D]/60 focus:bg-white/[0.05] transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting || !gameName.trim()}
                  className="inline-flex items-center gap-2 rounded-full bg-[#C1272D] hover:bg-[#C1272D]/90 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#C1272D]/25 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t("requests_submit_busy")}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{t("requests_submit")}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
