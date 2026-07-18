import { motion } from "framer-motion";
import { Link } from "react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Gamepad2, Shield, Zap, Heart, Users, Globe } from "lucide-react";

export default function About() {
  const { t } = useLanguage();

  const features = [
    { icon: Gamepad2, title: t("about_feature_1_title"), description: t("about_feature_1_desc"), color: "#C1272D" },
    { icon: Zap, title: t("about_feature_2_title"), description: t("about_feature_2_desc"), color: "#006233" },
    { icon: Shield, title: t("about_feature_3_title"), description: t("about_feature_3_desc"), color: "#C1272D" },
    { icon: Heart, title: t("about_feature_4_title"), description: t("about_feature_4_desc"), color: "#006233" },
    { icon: Users, title: t("about_feature_5_title"), description: t("about_feature_5_desc"), color: "#C1272D" },
    { icon: Globe, title: t("about_feature_6_title"), description: t("about_feature_6_desc"), color: "#006233" },
  ];

  return (
    <div className="min-h-screen bg-[#030303]">
      <Navigation />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-[#C1272D] text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t("saved_back")}
            </Link>
            <div className="flex items-center justify-center gap-4 mb-6">
              <img src="/logo.png" alt="MaaDHub" className="w-16 h-16 object-contain" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              {t("about_title_1")} <span className="text-gradient">{t("about_title_2")}</span>
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-8 rounded-2xl mb-16">
            <h2 className="text-2xl font-bold text-white mb-4">{t("about_mission_title")}</h2>
            <p className="text-white/50 leading-relaxed mb-4">{t("about_mission_1")}</p>
            <p className="text-white/50 leading-relaxed">{t("about_mission_2")}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-2xl font-bold text-white text-center mb-8">{t("about_why_title")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="glass-card p-6 rounded-xl group hover-glow"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${feature.color}15` }}>
                      <Icon className="w-5 h-5" style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
