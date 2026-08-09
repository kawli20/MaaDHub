import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import SavedAccounts from './pages/SavedAccounts'
import Sales from './pages/Sales'
import Contact from './pages/Contact'
import Tips from './pages/Tips'
import Requests from './pages/Requests'
import About from './pages/About'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop'
import { DEFAULT_ACCOUNTS } from '@/data/accounts'

const preloadImage = (url: string) =>
  new Promise<void>((resolve) => {
    const img = new Image()
    img.src = url
    img.onload = img.onerror = () => resolve()
  })

const preloadImages = (urls: string[]) => {
  const uniqueUrls = Array.from(new Set(urls.filter(Boolean)))
  return Promise.all(uniqueUrls.map(preloadImage))
}

export default function App() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const allUrls = DEFAULT_ACCOUNTS.map((account) => account.imageUrl)
    const bannerUrl = '/banner.gif'
    const visibleUrls = [...new Set(allUrls.slice(0, 8).concat(bannerUrl))]
    const backgroundUrls = Array.from(new Set(allUrls.slice(8)))

    let active = true

    preloadImages(visibleUrls).then(() => {
      if (active) {
        setIsReady(true)
      }
    })

    if (backgroundUrls.length) {
      const loadLater = () => preloadImages(backgroundUrls)
      if ('requestIdleCallback' in window) {
        ;(window as any).requestIdleCallback(loadLater, { timeout: 3000 })
      } else {
        setTimeout(loadLater, 1500)
      }
    }

    return () => {
      active = false
    }
  }, [])

  if (!isReady) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020203] px-4 py-6">
        <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[#07101b]/95 p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(193,39,45,0.16),_transparent_40%)] opacity-80" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#03050a] to-transparent" />
          <div className="relative z-10">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_0_0_10px_rgba(255,255,255,0.02)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C1272D]/20 text-[#C1272D] shadow-[0_0_0_6px_rgba(193,39,45,0.14)]">
                <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-transparent border-t-[#C1272D]" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">Loading the vault</h2>
            <p className="text-sm text-white/60 mb-7 leading-6">
              Warming up the first accounts and images so the homepage feels fast and smooth on mobile.
            </p>
            <div className="mx-auto flex w-full max-w-[220px] items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2">
              <span className="inline-flex h-3 w-3 animate-pulse rounded-full bg-[#C1272D]" />
              <span className="inline-flex h-3 w-3 animate-pulse rounded-full bg-white/50 animation-delay-150" />
              <span className="inline-flex h-3 w-3 animate-pulse rounded-full bg-white/30 animation-delay-300" />
              <span className="ml-auto text-[11px] uppercase tracking-[0.28em] text-white/40">
                starting
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <ScrollToTop />
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
    </>
  )
}
