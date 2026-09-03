import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Gamepad2,
  Bookmark,
  Mail,
  Info,
  Globe,
  Tag,
  HandCoins,
  MessageSquarePlus,
  Coins,
  Gift,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { LANGUAGES } from "@/i18n/translations";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@/lib/clerk";
import { usePoints } from "@/hooks/usePoints";
import { PointsModal } from "@/components/PointsModal";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();
  const { points, isPointsModalOpen, setIsPointsModalOpen } = usePoints();

  const currentLang = LANGUAGES.find((l) => l.code === lang);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: t("nav_home"), icon: Gamepad2 },
    { to: "/sales", label: t("nav_sales"), icon: Tag },
    { to: "/saved", label: t("nav_saved"), icon: Bookmark },
    { to: "/requests", label: t("nav_requests"), icon: MessageSquarePlus },
    { to: "/contact", label: t("nav_contact"), icon: Mail },
    { to: "/tips", label: t("nav_tips"), icon: HandCoins },
    { to: "/about", label: t("nav_about"), icon: Info },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#030303]/85 backdrop-blur-2xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="MaaDHub"
                className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                MaaD<span className="text-[#C1272D]">Hub</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? "text-[#C1272D] bg-[#C1272D]/10"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute inset-0 rounded-full border border-[#C1272D]/30"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}

              {/* POINTS & INVITE BUTTON */}
              <button
                onClick={() => setIsPointsModalOpen(true)}
                title="Points & Invite Hub (+10 pts per invite)"
                className="ml-1.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-[#C1272D]/15 to-amber-500/15 border border-amber-500/30 hover:border-amber-400 text-amber-300 hover:text-white transition-all shadow-sm hover:shadow-amber-500/20 group"
              >
                <Coins className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span className="text-xs font-mono font-bold">{points}</span>
                <span className="text-[10px] text-white/50 uppercase font-semibold">pts</span>
                <span className="ml-1 text-[9px] font-bold bg-[#C1272D] text-white px-1.5 py-0.2 rounded-full tracking-tight">
                  +10 Invite
                </span>
              </button>

              {/* Language Switcher */}
              <div className="relative ml-1">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                    langOpen
                      ? "text-[#C1272D] bg-[#C1272D]/10 border border-[#C1272D]/20"
                      : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="text-xs">{currentLang?.flag}</span>
                </button>

                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-2 py-2 rounded-xl glass-panel border border-white/[0.08] min-w-[180px] overflow-hidden bg-[#080d16]/95 backdrop-blur-2xl z-50 shadow-2xl"
                    >
                      {LANGUAGES.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => {
                            setLang(l.code);
                            setLangOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs transition-all ${
                            lang === l.code
                              ? "text-[#C1272D] bg-[#C1272D]/10"
                              : "text-white/60 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <span className="text-base">{l.flag}</span>
                          <span>{l.label}</span>
                          {lang === l.code && <span className="ml-auto text-[#C1272D]">✓</span>}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Clerk Authentication Controls */}
              <div className="ml-2 flex items-center gap-2">
                <SignedOut>
                  <SignInButton />
                  <SignUpButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>

            {/* Mobile Menu Button & Mobile Points Pill */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsPointsModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold"
              >
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>{points} pts</span>
              </button>

              <SignedIn>
                <UserButton />
              </SignedIn>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#030303]/98 backdrop-blur-2xl border-b border-white/[0.06]"
            >
              <div className="px-4 py-4 space-y-1">
                {/* Mobile Auth Buttons */}
                <SignedOut>
                  <div className="flex gap-2 pb-4 mb-3 border-b border-white/[0.06]">
                    <SignInButton className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-white/5 border border-white/15 hover:bg-white/10 active:scale-95 transition-all" />
                    <SignUpButton className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white bg-[#C1272D] hover:bg-[#d92d34] active:scale-95 shadow-lg shadow-[#C1272D]/20 transition-all" />
                  </div>
                </SignedOut>

                {/* Mobile Points & Invite Card */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsPointsModalOpen(true);
                  }}
                  className="w-full mb-3 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#C1272D]/15 to-transparent border border-amber-500/30 flex items-center justify-between text-left text-white"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Coins className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        Points & Invite Hub
                        <span className="text-[10px] text-amber-400 font-mono font-normal">
                          ({points} PTS)
                        </span>
                      </div>
                      <p className="text-[11px] text-white/50">Invite friends & get +10 pts each</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-[#C1272D] text-white text-xs font-semibold">
                    Open
                  </span>
                </button>

                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "text-[#C1272D] bg-[#C1272D]/10"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  );
                })}

                {/* Mobile Language Switcher */}
                <div className="pt-3 border-t border-white/[0.06] mt-3">
                  <p className="px-4 text-xs text-white/30 uppercase tracking-wider mb-2">
                    {t("nav_language")}
                  </p>
                  <div className="grid grid-cols-2 gap-2 px-4">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setLangOpen(false);
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                          lang === l.code
                            ? "text-[#C1272D] bg-[#C1272D]/10 border border-[#C1272D]/20"
                            : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                        }`}
                      >
                        <span className="text-base">{l.flag}</span>
                        <span className="text-xs">{l.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Points & Referral Modal */}
      <PointsModal
        isOpen={isPointsModalOpen}
        onClose={() => setIsPointsModalOpen(false)}
        onBrowseVault={() => {
          document.getElementById("vault")?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </>
  );
}
