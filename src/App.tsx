import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import SavedAccounts from './pages/SavedAccounts'
import Sales from './pages/Sales'
import Contact from './pages/Contact'
import Tips from './pages/Tips'
import About from './pages/About'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/saved" element={<SavedAccounts />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/tips" element={<Tips />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
