import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import SavedAccounts from './pages/SavedAccounts'
import Sales from './pages/Sales'
import Contact from './pages/Contact'
import About from './pages/About'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/saved" element={<SavedAccounts />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
