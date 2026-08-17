import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ====== MOROCCAN FLAG BACKGROUND ====== */}
      <div className="absolute inset-0">
        <img
          src="/banner.gif"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlays for text readability */}
        <div className="absolute inset-0 bg-[#030303]/40" />
        {/* top fade */}
        <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-b from-[#030303] via-transparent" />
        {/* bottom fade (smooth transition to content) */}
        <div className="absolute bottom-0 left-0 right-0 h-[50vh] pointer-events-none bg-gradient-to-t from-[#030303] via-[#030303]/50 to-transparent" />
        {/* subtle horizontal vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#030303]/60 via-transparent to-[#030303]/60" />
      </div>

      {/* ====== CONTENT ====== */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <HeroContent />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-white/30" />
      </motion.div>
    </section>
  );
}

/* ===== HERO CONTENT (needs useLanguage) ===== */
function HeroContent() {
  const { t } = useLanguage();
  const scrollToVault = () => {
    document.getElementById("vault")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#C1272D]/20 text-[#C1272D] text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          {t("hero_badge")}
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        style={{ textShadow: "0 4px 24px rgba(0,0,0,0.8)" }}
      >
        <span className="text-white">{t("hero_title_1")}</span>
        <br />
        <span className="text-gradient">{t("hero_title_2")}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-lg sm:text-xl text-white/50 mb-10 max-w-xl mx-auto"
        style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}
      >
        {t("hero_subtitle")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <button
          onClick={scrollToVault}
          className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full glass border border-white/10 text-white font-semibold text-sm uppercase tracking-wider hover:bg-[#C1272D] hover:text-[#030303] hover:border-[#C1272D] transition-all duration-500"
        >
          <span>{t("hero_cta")}</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </motion.div>
    </>
  );
}
