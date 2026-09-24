import { useState, useEffect, useRef } from "react";
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
  Volume2,
  VolumeX,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { LANGUAGES } from "@/i18n/translations";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@/lib/clerk";
import { usePoints } from "@/hooks/usePoints";
import { PointsModal } from "@/components/PointsModal";

const BACKGROUND_MUSIC_URL = encodeURI(
  "/bkmusic/𝑮𝒐𝒍𝒅𝒆𝒏 𝑩𝒓𝒐𝒘𝒏 - 𝑻𝒉𝒆 𝑺𝒕𝒓𝒂𝒏𝒈𝒍𝒆𝒓𝒔 𝑩𝒆𝒔𝒕 𝒑𝒂𝒓𝒕 𝒍𝒐𝒐𝒑𝒆𝒅.mp3"
);
const BACKGROUND_MUSIC_VOLUME = 0.07;

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tabsScrollRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();
  const { points, isPointsModalOpen, setIsPointsModalOpen } = usePoints();

  const currentLang = LANGUAGES.find((l) => l.code === lang);

  useEffect(() => {
    const audio = new Audio(BACKGROUND_MUSIC_URL);
    audio.loop = true;
    audio.volume = BACKGROUND_MUSIC_VOLUME;
    audio.preload = "auto";
    audio.muted = false;
    audioRef.current = audio;

    const tryAutoplay = () => {
      audio
        .play()
        .then(() => setMusicEnabled(true))
        .catch(() => setMusicEnabled(false));
    };

    tryAutoplay();

    const onUserGesture = () => {
      if (audio.paused) {
        tryAutoplay();
      }
    };

    window.addEventListener("pointerdown", onUserGesture, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onUserGesture);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => setMusicEnabled(false));
      setMusicEnabled(true);
    } else {
      audio.pause();
      setMusicEnabled(false);
    }
  };

  const scrollTabs = (direction: "left" | "right") => {
    const container = tabsScrollRef.current;
    if (!container) return;

    const amount = 220;
    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleTabWheelScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const container = tabsScrollRef.current;
    if (!container) return;

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault();
      container.scrollLeft += event.deltaY;
    }
  };

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
          <div className="flex items-center justify-between gap-3 min-h-16 py-2">
            {/* Logo */}
            <Link to="/" className="flex shrink-0 items-center gap-3 group">
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
            <div className="hidden md:flex flex-1 min-w-0 items-center justify-end gap-2">
              <button
                type="button"
                aria-label="Scroll tabs left"
                onClick={() => scrollTabs("left")}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-[#C1272D]/40 hover:text-white"
              >
                <span className="text-base">←</span>
              </button>

              <div
                ref={tabsScrollRef}
                onWheel={handleTabWheelScroll}
                className="flex min-w-0 flex-1 items-center justify-start overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex min-w-max items-center gap-1 whitespace-nowrap px-1">
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
                </div>
              </div>

              <button
                type="button"
                aria-label="Scroll tabs right"
                onClick={() => scrollTabs("right")}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:border-[#C1272D]/40 hover:text-white"
              >
                <span className="text-base">→</span>
              </button>

              <div className="flex shrink-0 items-center gap-2">
                {/* Music Toggle */}
                <button
                  type="button"
                  onClick={toggleMusic}
                  aria-label={musicEnabled ? "Pause background music" : "Play background music"}
                  className={`inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border px-2.5 py-1.5 text-[11px] font-medium transition ${
                    musicEnabled
                      ? "border-[#C1272D]/40 bg-[#C1272D]/10 text-[#C1272D]"
                      : "border-white/10 bg-white/5 text-white/70 hover:text-white"
                  }`}
                >
                  {musicEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
                  <span>{musicEnabled ? "Music On" : "Music Off"}</span>
                </button>

                {/* POINTS & INVITE BUTTON */}
                <button
                  onClick={() => setIsPointsModalOpen(true)}
                  title="Points & Invite Hub (+10 pts per invite)"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-[#C1272D]/15 to-amber-500/15 border border-amber-500/30 hover:border-amber-400 text-amber-300 hover:text-white transition-all shadow-sm hover:shadow-amber-500/20 group"
                >
                  <Coins className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
                  <span className="text-xs font-mono font-bold">{points}</span>
                  <span className="text-[10px] text-white/50 uppercase font-semibold">pts</span>
                  <span className="ml-1 text-[9px] font-bold bg-[#C1272D] text-white px-1.5 py-0.2 rounded-full tracking-tight">
                    +10 Invite
                  </span>
                </button>

                {/* Language Switcher */}
                <div className="relative">
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
                <div className="flex items-center gap-2">
                  <SignedOut>
                    <SignInButton />
                    <SignUpButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
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

                {/* Mobile Music Toggle */}
                <button
                  type="button"
                  onClick={toggleMusic}
                  className="mb-3 flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/80 transition hover:border-[#C1272D]/40 hover:bg-[#C1272D]/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-[#C1272D]/10 text-[#C1272D]">
                      {musicEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="font-medium text-white">Background music</div>
                      <div className="text-[11px] text-white/50">{musicEnabled ? "On" : "Off"}</div>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-[10px] uppercase tracking-wider text-white/60">
                    {musicEnabled ? "Mute" : "Play"}
                  </span>
                </button>

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

      <button
        type="button"
        onClick={toggleMusic}
        aria-label={musicEnabled ? "Pause background music" : "Play background music"}
        className="fixed bottom-4 left-4 z-[60] hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0b0b0b]/85 px-3 py-2 text-xs font-medium text-white/80 shadow-lg shadow-black/30 backdrop-blur-md transition hover:border-[#C1272D]/60 hover:text-white"
      >
        {musicEnabled ? <Volume2 className="h-4 w-4 text-[#C1272D]" /> : <VolumeX className="h-4 w-4 text-white/60" />}
        <span>{musicEnabled ? "Music On" : "Music Off"}</span>
      </button>

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
