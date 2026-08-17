import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowLeft, Gamepad2, Send, Sparkles } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/hooks/useLanguage";
import { useToast } from "@/hooks/useToast";

const TELEGRAM_BOT_TOKEN = "8647581584:AAGvkz7tBGiuX94c-2OR-LZBKepi1equg8U";
const TELEGRAM_CHANNEL_ID = "-1004445400084";

export default function Requests() {
  const { t } = useLanguage();
  const { addToast } = useToast();

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

    const messageParts = [`Game request: ${trimmedGame}`];
    if (trimmedNote) {
      messageParts.push(`Note: ${trimmedNote}`);
    }

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          chat_id: TELEGRAM_CHANNEL_ID,
          text: messageParts.join("\n"),
        }),
      });

      const data = await response.json();
      if (data.ok) {
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

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-[#C1272D] text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t("saved_back")}
            </Link>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C1272D]/20 bg-[#C1272D]/10 text-[#C1272D] text-sm mb-4">
                  <Sparkles className="w-4 h-4" />
                  {t("requests_badge")}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                  {t("requests_title_1")} <span className="text-gradient">{t("requests_title_2")}</span>
                </h1>
                <p className="text-white/40 text-sm max-w-2xl">{t("requests_desc")}</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.06] max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#C1272D]/10 border border-[#C1272D]/20 flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-[#C1272D]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{t("requests_form_title")}</h2>
                <p className="text-sm text-white/40">{t("requests_form_desc")}</p>
              </div>
            </div>

            <label className="block text-sm font-medium text-white/70 mb-2">
              {t("requests_game_label")}
            </label>
            <input
              value={gameName}
              onChange={(event) => setGameName(event.target.value)}
              placeholder={t("requests_game_placeholder")}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-[#C1272D]/60 focus:bg-white/[0.06] mb-4"
            />

            <label className="block text-sm font-medium text-white/70 mb-2">
              {t("requests_note_label")}
            </label>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder={t("requests_note_placeholder")}
              rows={4}
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-[#C1272D]/60 focus:bg-white/[0.06] mb-4"
            />

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-full bg-[#C1272D] px-5 py-3 text-sm font-semibold text-[#030303] transition-all hover:bg-[#C1272D]/90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send className="w-4 h-4" />
              {submitting ? t("requests_submit_busy") : t("requests_submit")}
            </button>
          </motion.form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
