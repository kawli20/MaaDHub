import { motion } from "framer-motion";
import { Link } from "react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-[#C1272D]/10 border border-[#C1272D]/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-[#C1272D]" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-2">{t("notfound_title")}</h1>
        <p className="text-white/40 text-lg mb-8">{t("notfound_desc")}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-[#C1272D]/20 text-[#C1272D] text-sm font-medium hover:bg-[#C1272D]/10 transition-all"
        >
          <Home className="w-4 h-4" />
          {t("notfound_back")}
        </Link>
      </motion.div>
    </div>
  );
}
