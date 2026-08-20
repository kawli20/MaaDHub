import { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router";
import ScrollToTop from "./components/ScrollToTop";
import ScrollingBackground from "./components/ScrollingBackground";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { DEFAULT_ACCOUNTS } from "@/data/accounts";

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
    <div className="min-h-screen flex items-center justify-center bg-[#030303]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-[#C1272D] border-t-transparent rounded-full animate-spin" />
        <p className="text-white/40 text-xs">Loading page...</p>
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
    const timeout = setTimeout(() => resolve(), 2000);
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

  useEffect(() => {
    const allUrls = (DEFAULT_ACCOUNTS || []).map((account) => account?.imageUrl).filter(Boolean);
    const bannerUrl = "/banner.gif";
    const visibleUrls = [...new Set(allUrls.slice(0, 6).concat(bannerUrl))];
    const backgroundUrls = Array.from(new Set(allUrls.slice(6)));

    let active = true;

    // Safety fallback timeout: show UI within 1.5s max
    const maxTimeout = setTimeout(() => {
      if (active) setIsReady(true);
    }, 1500);

    preloadImages([...visibleUrls, BG_IMAGE]).then(() => {
      if (active) {
        clearTimeout(maxTimeout);
        setIsReady(true);
      }
    });

    if (backgroundUrls.length) {
      const loadLater = () => preloadImages(backgroundUrls);
      if ("requestIdleCallback" in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => void }).requestIdleCallback(loadLater, { timeout: 3000 });
      } else {
        setTimeout(loadLater, 2000);
      }
    }

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
              <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-[#C1272D]" />
              <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-white/50" />
              <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-white/30" />
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
      </div>
    </ErrorBoundary>
  );
}
