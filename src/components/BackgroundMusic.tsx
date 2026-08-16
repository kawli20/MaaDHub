import { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, Volume1, VolumeX, Play, Pause, Radio, X, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * =========================================================================
 * 🎵 BACKGROUND MUSIC CONFIGURATION
 * =========================================================================
 * - DEFAULT_VOLUME: Set your starting volume between 0.0 (0%) and 1.0 (100%)
 *   👉 Change this value to 0.50 if you want it to start at 50% in future updates:
 *      0.30 = 30% (Current Default)
 *      0.50 = 50%
 *      0.80 = 80%
 *      1.00 = 100%
 * =========================================================================
 */
export const DEFAULT_VOLUME = 0.1;

export const AUDIO_STREAM_URL =
  "https://s3.ustatik.com/audio.com.audio/transcoding/85/75/1873721028697585-1873721028770381-1873721067872097.mp3?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=F0E8U41NBMMW3Y027UTJ%2F20260816%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20260816T223738Z&X-Amz-SignedHeaders=host&X-Amz-Expires=518400&X-Amz-Signature=09eff4aa2238be369491a4c0c8fbd2f8908ff71db476f0e92556b94f6d8c9397";

const STORAGE_VOLUME_KEY = "maadhub_bg_music_volume_v4";
const STORAGE_MUTED_KEY = "maadhub_bg_music_muted_v4";

interface BackgroundMusicProps {
  isReady?: boolean;
}

export default function BackgroundMusic({ isReady = true }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize volume with DEFAULT_VOLUME (30% / 0.3) or user's stored preference
  const [volume, setVolume] = useState<number>(() => {
    const savedVol = localStorage.getItem(STORAGE_VOLUME_KEY);
    if (savedVol !== null) {
      const parsed = parseFloat(savedVol);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
        return parsed;
      }
    }
    return DEFAULT_VOLUME;
  });

  const [isMuted, setIsMuted] = useState<boolean>(() => {
    const savedMuted = localStorage.getItem(STORAGE_MUTED_KEY);
    return savedMuted === "true";
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState<boolean>(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState<boolean>(false);
  const [userManuallyPaused, setUserManuallyPaused] = useState<boolean>(false);
  const previousVolumeRef = useRef<number>(volume || DEFAULT_VOLUME);

  // Synchronize audio volume and muted state
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.muted = isMuted;
    localStorage.setItem(STORAGE_VOLUME_KEY, volume.toString());
    localStorage.setItem(STORAGE_MUTED_KEY, isMuted ? "true" : "false");
  }, [volume, isMuted]);

  // Attempt automatic playback with sound
  const attemptPlay = useCallback(async () => {
    if (!audioRef.current || userManuallyPaused) return;

    try {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
      }
    } catch {
      // Browser blocked autoplay; unlock on first interaction
      setIsPlaying(false);
    }
  }, [volume, isMuted, userManuallyPaused]);

  // Play as soon as app is ready
  useEffect(() => {
    if (isReady) {
      attemptPlay();
    }
  }, [isReady, attemptPlay]);

  // Global gesture listener to unlock audio seamlessly on mobile / desktop
  useEffect(() => {
    const unlockAudio = () => {
      if (!userManuallyPaused && audioRef.current && audioRef.current.paused) {
        audioRef.current.volume = volume;
        audioRef.current.muted = isMuted;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => { });
      }
    };

    window.addEventListener("click", unlockAudio, { once: true, passive: true });
    window.addEventListener("touchstart", unlockAudio, { once: true, passive: true });
    window.addEventListener("pointerdown", unlockAudio, { once: true, passive: true });
    window.addEventListener("keydown", unlockAudio, { once: true, passive: true });

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, [volume, isMuted, userManuallyPaused]);

  // Play / Pause Toggle
  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setUserManuallyPaused(true);
    } else {
      setUserManuallyPaused(false);
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => { });
    }
  };

  // Mute / Unmute Toggle
  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isMuted) {
      setIsMuted(false);
      if (volume === 0) {
        setVolume(previousVolumeRef.current > 0 ? previousVolumeRef.current : DEFAULT_VOLUME);
      }
    } else {
      previousVolumeRef.current = volume > 0 ? volume : DEFAULT_VOLUME;
      setIsMuted(true);
    }
  };

  // Volume Slider Handler
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    } else if (newVol === 0 && !isMuted) {
      setIsMuted(true);
    }
  };

  const volumePercent = isMuted ? 0 : Math.round(volume * 100);

  const getVolumeIcon = (className = "w-4 h-4") => {
    if (isMuted || volume === 0) {
      return <VolumeX className={`${className} text-[#C1272D]`} />;
    }
    if (volume < 0.5) {
      return <Volume1 className={`${className} text-white/80`} />;
    }
    return <Volume2 className={`${className} text-white/80`} />;
  };

  return (
    <aside
      aria-label="Background Soundtrack"
      className="fixed bottom-4 left-4 z-40 select-none sm:bottom-6 sm:left-6"
    >
      {/* Native Audio Tag */}
      <audio
        ref={audioRef}
        src={AUDIO_STREAM_URL}
        loop
        preload="auto"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => { });
          }
        }}
      />

      {/* ========================================================== */}
      {/* 📱 MOBILE VIEW: SLEEK CYBER CAPSULE + MODAL SHEET          */}
      {/* ========================================================== */}
      <div className="flex sm:hidden items-center">
        {/* Mobile Mini Floating Pill */}
        <div
          className={`flex items-center gap-1.5 rounded-full border bg-[#06080e]/95 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-300 ${isPlaying
              ? "border-[#C1272D]/50 shadow-[0_0_20px_rgba(193,39,45,0.3)]"
              : "border-white/10"
            }`}
        >
          {/* Play/Pause Button with Equalizer */}
          <button
            type="button"
            onClick={togglePlay}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform active:scale-90 ${isPlaying
                ? "bg-[#C1272D] text-white shadow-[0_0_15px_rgba(193,39,45,0.6)]"
                : "bg-white/10 text-white/60 hover:text-white"
              }`}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <div className="flex items-end justify-center gap-[2px] h-3.5">
                <span className="w-[2.5px] bg-white rounded-full animate-[musicBar1_0.8s_ease-in-out_infinite]" />
                <span className="w-[2.5px] bg-white rounded-full animate-[musicBar2_0.6s_ease-in-out_infinite_0.15s]" />
                <span className="w-[2.5px] bg-white rounded-full animate-[musicBar3_0.9s_ease-in-out_infinite_0.3s]" />
              </div>
            ) : (
              <Play className="w-4 h-4 ml-0.5 fill-current" />
            )}
          </button>

          {/* Volume Control Trigger Pill */}
          <button
            type="button"
            onClick={() => setIsMobileModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-white/80 active:scale-95 transition-all"
            aria-label="Open volume settings"
          >
            {getVolumeIcon("w-3.5 h-3.5")}
            <span className="font-mono text-[11px] font-medium text-white/90 tabular-nums">
              {volumePercent}%
            </span>
          </button>
        </div>

        {/* Mobile Audio Controls Popup Card */}
        <AnimatePresence>
          {isMobileModalOpen && (
            <>
              {/* Dimmed Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileModalOpen(false)}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              />

              {/* Centered / Docked Glass Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="fixed bottom-6 left-4 right-4 z-50 mx-auto max-w-sm rounded-3xl border border-[#C1272D]/30 bg-[#080b12]/95 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(193,39,45,0.2)] backdrop-blur-2xl"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C1272D]/20 text-[#C1272D] border border-[#C1272D]/30">
                      <Radio className="w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white tracking-wide">
                        MaaDHub Sound
                      </h4>
                      <p className="text-[10px] text-white/50 font-mono">
                        {isPlaying ? "Playing in background" : "Soundtrack paused"}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsMobileModalOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white active:scale-90"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Volume Slider Section */}
                <div className="py-4 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white/50 uppercase tracking-wider text-[10px]">
                      Master Volume
                    </span>
                    <span className="font-bold text-[#C1272D] text-sm tabular-nums">
                      {volumePercent}%
                    </span>
                  </div>

                  {/* Range Slider */}
                  <div className="relative flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#C1272D] focus:outline-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_12px_#C1272D] [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-[0_0_12px_#C1272D]"
                    />
                  </div>

                  {/* Fast Preset Volume Buttons */}
                  <div className="flex items-center justify-between gap-1.5 pt-1">
                    {[0.1, 0.25, 0.5, 0.75, 1.0].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setVolume(preset);
                          if (isMuted) setIsMuted(false);
                        }}
                        className={`flex-1 py-1.5 rounded-lg font-mono text-[11px] font-semibold transition-all ${
                          !isMuted && Math.round(volume * 100) === Math.round(preset * 100)
                            ? "bg-[#C1272D] text-white shadow-[0_0_10px_rgba(193,39,45,0.5)]"
                            : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {Math.round(preset * 100)}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Control Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border font-medium text-xs transition-all active:scale-95 ${isMuted || volume === 0
                        ? "bg-[#C1272D]/20 border-[#C1272D]/50 text-[#C1272D]"
                        : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                      }`}
                  >
                    {getVolumeIcon()}
                    <span>{isMuted ? "Unmute" : "Mute"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={togglePlay}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-xs text-white transition-all active:scale-95 ${isPlaying
                        ? "bg-[#C1272D] shadow-[0_0_15px_rgba(193,39,45,0.5)]"
                        : "bg-white/15 hover:bg-white/20"
                      }`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isPlaying ? "Pause" : "Play"}</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================== */}
      {/* 💻 DESKTOP VIEW: COOL EXPANDABLE CYBER GLASS CAPSULE       */}
      {/* ========================================================== */}
      <div
        className="hidden sm:flex items-center"
        onMouseEnter={() => setIsDesktopExpanded(true)}
        onMouseLeave={() => setIsDesktopExpanded(false)}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={`relative flex items-center overflow-hidden rounded-2xl border bg-[#06080e]/90 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(193,39,45,0.15)] backdrop-blur-2xl transition-colors duration-300 ${isPlaying
              ? "border-[#C1272D]/40 shadow-[0_0_30px_rgba(193,39,45,0.25)]"
              : "border-white/10"
            } ${isDesktopExpanded ? "p-2.5" : "p-1.5"}`}
        >
          {/* Main Action Button */}
          <button
            type="button"
            onClick={togglePlay}
            className={`relative group/btn flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 active:scale-90 ${isPlaying
                ? "bg-gradient-to-br from-[#C1272D] to-[#87181c] text-white shadow-[0_0_20px_rgba(193,39,45,0.6)]"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            title={isPlaying ? "Pause music" : "Play music"}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <div className="flex items-end justify-center gap-[3px] h-4">
                <span className="w-[3px] bg-white rounded-full animate-[musicBar1_0.8s_ease-in-out_infinite]" />
                <span className="w-[3px] bg-white rounded-full animate-[musicBar2_0.6s_ease-in-out_infinite_0.15s]" />
                <span className="w-[3px] bg-white rounded-full animate-[musicBar3_0.9s_ease-in-out_infinite_0.3s]" />
                <span className="w-[3px] bg-white rounded-full animate-[musicBar4_0.7s_ease-in-out_infinite_0.1s]" />
              </div>
            ) : (
              <Play className="w-5 h-5 ml-0.5 fill-current text-white/80" />
            )}

            {isPlaying && (
              <span className="absolute -inset-0.5 rounded-xl border border-white/30 animate-pulse pointer-events-none" />
            )}
          </button>

          {/* Expandable Controls Tray */}
          <AnimatePresence initial={false}>
            {isDesktopExpanded && (
              <motion.div
                initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                animate={{ width: "auto", opacity: 1, marginLeft: 10 }}
                exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="flex items-center gap-3 overflow-hidden pr-2"
              >
                {/* Mini Info Badge */}
                <div className="flex flex-col justify-center border-r border-white/10 pr-3">
                  <div className="flex items-center gap-1.5">
                    <Radio
                      className={`w-3 h-3 ${isPlaying ? "text-[#C1272D] animate-pulse" : "text-white/40"
                        }`}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">
                      {isPlaying ? "Soundtrack" : "Paused"}
                    </span>
                  </div>
                  <span className="text-[9px] text-white/40 font-mono tracking-tight">
                    MaaDHub Radio
                  </span>
                </div>

                {/* Quick Mute Toggle */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all ${isMuted || volume === 0
                      ? "bg-[#C1272D]/20 border-[#C1272D]/50 text-[#C1272D]"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  title={isMuted ? "Unmute" : "Mute"}
                  aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                >
                  {getVolumeIcon()}
                </button>

                {/* Volume Slider Track */}
                <div className="flex flex-col gap-1 w-28">
                  <div className="flex items-center justify-between text-[10px] font-mono text-white/60">
                    <span className="text-[9px] uppercase tracking-wider text-white/40">Vol</span>
                    <span className="font-semibold text-white/90 tabular-nums">
                      {volumePercent}%
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#C1272D] focus:outline-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_10px_#C1272D] [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-125 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-[0_0_10px_#C1272D]"
                      aria-label="Adjust volume"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Dynamic Keyframes for Equalizer Bars */}
      <style>{`
        @keyframes musicBar1 {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        @keyframes musicBar2 {
          0%, 100% { height: 14px; }
          50% { height: 6px; }
        }
        @keyframes musicBar3 {
          0%, 100% { height: 6px; }
          50% { height: 16px; }
        }
        @keyframes musicBar4 {
          0%, 100% { height: 12px; }
          50% { height: 5px; }
        }
      `}</style>
    </aside>
  );
}
