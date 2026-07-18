import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface AdBannerProps {
  ad: {
    name: string;
    bio: string;
    link: string;
  };
  index?: number;
}

export function AdBanner({ ad, index = 0 }: AdBannerProps) {
  const { t } = useLanguage();
  const styleIndex = index % 3;

  return (
    <motion.a
      href={ad.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: 0.05 * (index % 4) }}
      className="group relative block w-full overflow-hidden rounded-2xl border border-white/[0.06] hover:border-[#C1272D]/30 transition-all duration-500"
      style={{ background: "rgba(255,255,255,0.02)", minHeight: "140px" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {styleIndex === 0 && <Rings3D />}
        {styleIndex === 1 && <FloatingOrbs />}
        {styleIndex === 2 && <GeometricGrid />}
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#C1272D]/5 via-transparent to-[#006233]/5" />
      </div>

      <div className="relative px-8 py-8 sm:px-12 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-[#C1272D] border border-[#C1272D]/30 bg-[#C1272D]/5">
              {t("ad_sponsored")}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-gradient transition-all duration-300 mb-2 truncate tracking-tight">
            {ad.name}
          </h3>

          <p className="text-white/40 text-sm max-w-xl leading-relaxed">{ad.bio}</p>
        </div>

        <div className="shrink-0 self-start sm:self-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] text-white/60 text-sm font-medium group-hover:bg-[#C1272D] group-hover:text-[#030303] group-hover:border-[#C1272D] transition-all duration-300">
            <span>{t("ad_cta")}</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C1272D]/0 group-hover:via-[#C1272D]/50 to-transparent transition-all duration-500" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-white/20 transition-all duration-500" />
    </motion.a>
  );
}

/* 3D ANIMATIONS - unchanged */
function Rings3D() {
  const rings = Array.from({ length: 5 }, (_, i) => i);
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative" style={{ perspective: "500px", width: "250px", height: "250px" }}>
        {rings.map((i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C1272D]/10"
            style={{
              width: `${60 + i * 35}px`,
              height: `${60 + i * 35}px`,
              animation: `ringRot${i % 3} ${5 + i}s linear infinite`,
              transformStyle: "preserve-3d",
            }}
          />
        ))}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C1272D]/30" style={{ boxShadow: "0 0 20px rgba(193,39,45,0.3)" }} />
      </div>
      <style>{`
        @keyframes ringRot0 { 0% { transform: translate(-50%,-50%) rotateX(60deg) rotateZ(0deg); } 100% { transform: translate(-50%,-50%) rotateX(60deg) rotateZ(360deg); } }
        @keyframes ringRot1 { 0% { transform: translate(-50%,-50%) rotateX(45deg) rotateY(0deg); } 100% { transform: translate(-50%,-50%) rotateX(45deg) rotateY(-360deg); } }
        @keyframes ringRot2 { 0% { transform: translate(-50%,-50%) rotateY(60deg) rotateZ(0deg); } 100% { transform: translate(-50%,-50%) rotateY(60deg) rotateZ(360deg); } }
      `}</style>
    </div>
  );
}

function FloatingOrbs() {
  return (
    <div className="absolute inset-0">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 30 + i * 15,
            height: 30 + i * 15,
            background: `radial-gradient(circle, ${i % 2 === 0 ? "rgba(193,39,45,0.08)" : "rgba(0,98,51,0.08)"} 0%, transparent 70%)`,
            boxShadow: `0 0 ${30 + i * 10}px ${i % 2 === 0 ? "rgba(193,39,45,0.06)" : "rgba(0,98,51,0.06)"}`,
            animation: `orbF${i % 2} ${8 + i * 3}s ease-in-out infinite`,
            left: `${15 + i * 20}%`,
            top: `${10 + i * 15}%`,
          }}
        />
      ))}
      <style>{`
        @keyframes orbF0 { 0%,100%{transform:translate(0,0)scale(1)}50%{transform:translate(20px,-20px)scale(1.1)} }
        @keyframes orbF1 { 0%,100%{transform:translate(0,0)scale(1)}50%{transform:translate(-20px,15px)scale(1.15)} }
      `}</style>
    </div>
  );
}

function GeometricGrid() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(193,39,45,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,98,51,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          animation: "gridS 25s linear infinite",
        }}
      />
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 22}%`,
            top: `${15 + i * 18}%`,
            animation: `dP${i % 2} ${4 + i}s ease-in-out infinite ${i * 0.7}s`,
          }}
        >
          <div
            className="border"
            style={{
              width: 8 + i * 3,
              height: 8 + i * 3,
              transform: "rotate(45deg)",
              borderColor: i % 2 === 0 ? "rgba(193,39,45,0.15)" : "rgba(0,98,51,0.15)",
              background: i % 2 === 0 ? "rgba(193,39,45,0.02)" : "rgba(0,98,51,0.02)",
            }}
          />
        </div>
      ))}
      <style>{`
        @keyframes gridS { 0%{transform:translate(0,0)}100%{transform:translate(50px,50px)} }
        @keyframes dP0 { 0%,100%{transform:rotate(45deg)scale(1);opacity:0.3}50%{transform:rotate(45deg)scale(1.4);opacity:0.8} }
        @keyframes dP1 { 0%,100%{transform:rotate(45deg)scale(1);opacity:0.2}50%{transform:rotate(45deg)scale(1.3);opacity:0.6} }
      `}</style>
    </div>
  );
}
