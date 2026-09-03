import { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router";
import ScrollToTop from "./components/ScrollToTop";
import ScrollingBackground from "./components/ScrollingBackground";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { DEFAULT_ACCOUNTS } from "@/data/accounts";
import { SkeletonNav, SkeletonHero, SkeletonFilters, SkeletonGrid } from "./components/Skeleton";

import { getOptimizedImageUrl } from "@/lib/imageOptimizer";
import { usePoints } from "@/hooks/usePoints";
import { UnlockModal } from "@/components/UnlockModal";

const Home = lazy(() => import("./pages/Home"));
const SavedAccounts = lazy(() => import("./pages/SavedAccounts"));
const Sales = lazy(() => import("./pages/Sales"));
const Contact = lazy(() => import("./pages/Contact"));
const Tips = lazy(() => import("./pages/Tips"));
const Requests = lazy(() => import("./pages/Requests"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#030303]">
      <SkeletonNav />
      <SkeletonHero />
      <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/[0.04] animate-pulse" />
              <div className="h-8 w-48 rounded-lg bg-white/[0.04] animate-pulse" />
            </div>
            <div className="h-4 w-72 rounded bg-white/[0.03] animate-pulse" />
          </div>
          <SkeletonFilters />
          <div className="mt-6 mb-6">
            <div className="h-3 w-32 rounded bg-white/[0.03] animate-pulse" />
          </div>
          <SkeletonGrid count={8} />
        </div>
      </div>
    </div>
  );
}

const preloadImage = (url: string) =>
  new Promise<void>((resolve) => {
    if (!url) {
      resolve();
      return;
    }
    const img = new Image();
    const timeout = setTimeout(() => resolve(), 800);
    img.src = url;
    img.onload = img.onerror = () => {
      clearTimeout(timeout);
      resolve();
    };
  });

const preloadImages = (urls: string[]) => {
  const uniqueUrls = Array.from(new Set(urls.filter(Boolean)));
  return Promise.all(uniqueUrls.map(preloadImage));
};

const BG_IMAGE = "https://i.pinimg.com/1200x/f5/a6/a8/f5a6a839e3a7bc769edd82e903240134.jpg";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const {
    selectedAccountToUnlock,
    setSelectedAccountToUnlock,
    setIsPointsModalOpen,
  } = usePoints();

  useEffect(() => {
    const allUrls = (DEFAULT_ACCOUNTS || [])
      .slice(0, 8)
      .map((account) => getOptimizedImageUrl(account?.imageUrl, 400, 75))
      .filter(Boolean);

    let active = true;

    // Fast load: reveal UI within 400ms max
    const maxTimeout = setTimeout(() => {
      if (active) setIsReady(true);
    }, 400);

    preloadImages(allUrls).then(() => {
      if (active) {
        clearTimeout(maxTimeout);
        setIsReady(true);
      }
    });

    return () => {
      active = false;
      clearTimeout(maxTimeout);
    };
  }, []);

  if (!isReady) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020203] px-4 py-6">
        <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#07101b]/95 p-8 text-center shadow-2xl backdrop-blur-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(193,39,45,0.18),_transparent_50%)] opacity-80" />
          <div className="relative z-10">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C1272D]/20 text-[#C1272D]">
                <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-transparent border-t-[#C1272D]" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Preparing MaaDHub Vault</h2>
            <p className="text-xs text-white/50 mb-6 leading-relaxed">
              Optimizing accounts and performance for smooth browsing.
            </p>
            <div className="mx-auto flex w-full max-w-[200px] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-[#C1272D]" style={{ animationDelay: "0ms" }} />
              <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-white/50" style={{ animationDelay: "200ms" }} />
              <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-white/30" style={{ animationDelay: "400ms" }} />
              <span className="ml-auto text-[10px] uppercase tracking-widest text-white/40">
                ready
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <ScrollingBackground />
      <div className="relative z-10">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/saved" element={<SavedAccounts />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tips" element={<Tips />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        {/* Global Account Unlock Modal */}
        <UnlockModal
          account={selectedAccountToUnlock}
          isOpen={Boolean(selectedAccountToUnlock)}
          onClose={() => setSelectedAccountToUnlock(null)}
          onOpenInviteModal={() => {
            setSelectedAccountToUnlock(null);
            setIsPointsModalOpen(true);
          }}
        />
      </div>
    </ErrorBoundary>
  );
}
