import { motion } from "framer-motion";
import { Link } from "react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Globe, ArrowLeft, ExternalLink } from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#030303]">
      <Navigation />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-[#C1272D] text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t("saved_back")}
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              {t("contact_title_1")} <span className="text-gradient">{t("contact_title_2")}</span>
            </h1>
            <p className="text-white/40 text-sm mb-10">{t("contact_desc")}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <a
              href="https://maad.qzz.io"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 rounded-xl flex items-center gap-5 group hover-glow transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C1272D]/10 border border-[#C1272D]/20 flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6 text-[#C1272D]" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1 group-hover:text-[#C1272D] transition-colors">{t("contact_website")}</h3>
                <p className="text-white/40 text-sm">maad.qzz.io</p>
              </div>
              <ExternalLink className="w-5 h-5 text-white/20 group-hover:text-[#C1272D] transition-colors" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 glass-panel p-8 rounded-2xl text-center"
          >
            <h2 className="text-xl font-bold text-white mb-2">{t("contact_ad_title")}</h2>
            <p className="text-white/40 text-sm mb-6">{t("contact_ad_desc")}</p>
            <a
              href="https://maad.qzz.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C1272D] text-[#030303] font-semibold text-sm hover:bg-[#C1272D]/90 transition-all"
            >
              {t("contact_ad_cta")} <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
