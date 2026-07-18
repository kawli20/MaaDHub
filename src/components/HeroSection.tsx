import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export function HeroSection() {
  const scrollToVault = () => {
    document.getElementById("vault")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030303]">
      {/* ====== MOROCCAN FLAG BACKGROUND ====== */}
      <div className="absolute inset-0">
        <img
          src="/morocco-flag-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Dark overlays for text readability */}
        <div className="absolute inset-0 bg-[#030303]/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/80 via-transparent to-[#030303]/80" />
      </div>

      {/* ====== CONTENT ====== */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <HeroContent />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-white/30" />
      </motion.div>

      {/* 3D Animation Styles */}
      <style>{`
        @keyframes tunnelRing {
          0% { transform: rotateX(70deg) rotateZ(0deg) scale(0.3); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: rotateX(70deg) rotateZ(360deg) scale(1.5); opacity: 0; }
        }
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.1); }
          50% { transform: translate(-20px, -40px) scale(0.95); }
          75% { transform: translate(20px, 15px) scale(1.05); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 25px) scale(1.15); }
          66% { transform: translate(20px, -20px) scale(0.9); }
        }
        @keyframes hexSpin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes diamondPulse {
          0%, 100% { transform: rotate(45deg) scale(1); opacity: 0.3; }
          50% { transform: rotate(45deg) scale(1.4); opacity: 0.8; }
        }
        @keyframes particleDrift {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(-100vh) translateX(30px); opacity: 0; }
        }

      `}</style>
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

/* ===== 3D WIRE FRAME TUNNEL ===== */
function Tunnel3D() {
  const rings = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="relative"
        style={{ perspective: "500px", width: "600px", height: "600px" }}
      >
        {rings.map((i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              border: `1px solid ${i % 2 === 0 ? "rgba(193,39,45,0.12)" : "rgba(0,98,51,0.08)"}`,
              animation: `tunnelRing ${6 + i * 0.8}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
              transformStyle: "preserve-3d",
            }}
          />
        ))}

        {/* Center glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
          style={{
            background: "rgba(193,39,45,0.4)",
            boxShadow: "0 0 40px rgba(193,39,45,0.3), 0 0 80px rgba(193,39,45,0.1), 0 0 120px rgba(0,98,51,0.1)",
          }}
        />
      </div>
    </div>
  );
}

/* ===== FLOATING 3D SHAPES ===== */
function FloatingShapes() {
  return (
    <>
      {/* Large orb top-left */}
      <div
        className="absolute w-32 h-32 rounded-full"
        style={{
          top: "15%",
          left: "10%",
          background: "radial-gradient(circle, rgba(193,39,45,0.08) 0%, transparent 70%)",
          boxShadow: "0 0 60px rgba(193,39,45,0.06), inset 0 0 30px rgba(193,39,45,0.03)",
          animation: "floatOrb1 12s ease-in-out infinite",
        }}
      />

      {/* Orb top-right */}
      <div
        className="absolute w-24 h-24 rounded-full"
        style={{
          top: "20%",
          right: "12%",
          background: "radial-gradient(circle, rgba(0,98,51,0.08) 0%, transparent 70%)",
          boxShadow: "0 0 50px rgba(0,98,51,0.06), inset 0 0 25px rgba(0,98,51,0.03)",
          animation: "floatOrb2 16s ease-in-out infinite",
        }}
      />

      {/* Orb bottom-left */}
      <div
        className="absolute w-20 h-20 rounded-full"
        style={{
          bottom: "25%",
          left: "15%",
          background: "radial-gradient(circle, rgba(193,39,45,0.06) 0%, transparent 70%)",
          boxShadow: "0 0 40px rgba(193,39,45,0.04)",
          animation: "floatOrb2 10s ease-in-out infinite reverse",
        }}
      />

      {/* Hexagon wireframe right side */}
      <div
        className="absolute"
        style={{
          right: "8%",
          top: "40%",
          animation: "hexSpin 25s linear infinite",
        }}
      >
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <polygon
            points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
            stroke="rgba(193,39,45,0.1)"
            strokeWidth="1"
            fill="none"
          />
          <polygon
            points="50,25 72,37.5 72,62.5 50,75 28,62.5 28,37.5"
            stroke="rgba(0,98,51,0.08)"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Diamond left side */}
      <div
        className="absolute"
        style={{
          left: "5%",
          top: "55%",
          animation: "diamondPulse 5s ease-in-out infinite",
        }}
      >
        <div
          className="w-10 h-10 border border-[#C1272D]/15"
          style={{ background: "rgba(193,39,45,0.02)" }}
        />
      </div>

      {/* Diamond bottom-right */}
      <div
        className="absolute"
        style={{
          right: "18%",
          bottom: "30%",
          animation: "diamondPulse 7s ease-in-out infinite 2s",
        }}
      >
        <div
          className="w-8 h-8 border border-[#006233]/12"
          style={{ background: "rgba(0,98,51,0.02)" }}
        />
      </div>

      {/* Cross shape */}
      <div
        className="absolute"
        style={{
          left: "25%",
          top: "30%",
          animation: "hexSpin 20s linear infinite reverse",
        }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <line x1="15" y1="2" x2="15" y2="28" stroke="rgba(193,39,45,0.1)" strokeWidth="1" />
          <line x1="2" y1="15" x2="28" y2="15" stroke="rgba(193,39,45,0.1)" strokeWidth="1" />
        </svg>
      </div>

      {/* Small cross top-right */}
      <div
        className="absolute"
        style={{
          right: "25%",
          top: "15%",
          animation: "hexSpin 18s linear infinite",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <line x1="10" y1="2" x2="10" y2="18" stroke="rgba(0,98,51,0.1)" strokeWidth="1" />
          <line x1="2" y1="10" x2="18" y2="10" stroke="rgba(0,98,51,0.1)" strokeWidth="1" />
        </svg>
      </div>

      {/* Triangle */}
      <div
        className="absolute"
        style={{
          right: "35%",
          bottom: "20%",
          animation: "floatOrb1 14s ease-in-out infinite",
        }}
      >
        <svg width="50" height="45" viewBox="0 0 50 45" fill="none">
          <polygon
            points="25,3 47,42 3,42"
            stroke="rgba(193,39,45,0.08)"
            strokeWidth="1"
            fill="rgba(193,39,45,0.02)"
          />
        </svg>
      </div>

      {/* Rising particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`p-${i}`}
          className="absolute rounded-full"
          style={{
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            left: `${Math.random() * 100}%`,
            bottom: "-10px",
            background: i % 2 === 0 ? "rgba(193,39,45,0.4)" : "rgba(0,98,51,0.3)",
            animation: `particleDrift ${8 + Math.random() * 10}s linear infinite`,
            animationDelay: `${Math.random() * 12}s`,
          }}
        />
      ))}
    </>
  );
}


