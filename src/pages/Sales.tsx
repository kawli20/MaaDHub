import { motion } from "framer-motion"
import { Link } from "react-router"
import { Tag, ExternalLink, Clipboard } from "lucide-react"
import { useLanguage } from "@/hooks/useLanguage"
import { useToast } from "@/hooks/useToast"
import { ToastContainer } from "@/components/Toast"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { DEFAULT_SALES } from "@/data/accounts"

export default function Sales() {
  const { t } = useLanguage()
  const { toasts, addToast, removeToast } = useToast()

  const sales = [...DEFAULT_SALES].sort((a, b) => b.id - a.id)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    addToast(t("sales_contact_copied"), "success")
  }

  return (
    <div className="min-h-screen bg-[#030303]">
      <Navigation />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Tag className="w-6 h-6 text-[#C1272D]" />
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {t("sales_title_1")} <span className="text-gradient">{t("sales_title_2")}</span>
              </h1>
            </div>
            <p className="text-white/40 text-sm max-w-2xl">
              {t("sales_desc")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card border border-white/10 bg-white/5 p-6 rounded-3xl mb-10"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#C1272D]/80 mb-2">
                  {t("sales_note_label")}
                </p>
                <h2 className="text-xl font-semibold text-white">
                  {t("sales_note_title")}
                </h2>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#C1272D]/10 text-[#C1272D] text-sm font-medium hover:bg-[#C1272D]/20 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                {t("sales_note_action")}
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-3">{t("sales_list_title")}</h2>
            <p className="text-white/40 text-sm max-w-xl">{t("sales_list_desc")}</p>
          </motion.div>

          {sales.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sales.map((item, index) => {
                const imageUrl = item.imageUrl || "/games/steam.jpg"
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card rounded-3xl border border-white/10 overflow-hidden"
                  >
                    <div className="relative overflow-hidden h-52">
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/games/steam.jpg"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/95 via-[#030303]/50 to-transparent" />
                      <div className="absolute left-4 bottom-4 right-4">
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-white/80 bg-black/30 border border-white/10">
                            {item.platform}
                          </span>
                          <span className="text-xs text-white/40">#{item.id}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white leading-tight">{item.title}</h3>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>

                      <div className="space-y-3">
                        {item.supportLink ? (
                          <a
                            href={item.supportLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full px-4 py-3 bg-[#C1272D]/10 text-[#C1272D] hover:bg-[#C1272D]/20 hover:text-white transition-all text-sm font-medium"
                          >
                            <ExternalLink className="w-4 h-4" />
                            {t("sales_contact_shop")}
                          </a>
                        ) : (
                          <p className="text-white/80 text-sm break-words">{item.contact}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <Tag className="w-16 h-16 text-white/10 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-white/40 mb-2">{t("sales_empty_title")}</h2>
              <p className="text-white/25 text-sm max-w-md mx-auto">{t("sales_empty_desc")}</p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-[#C1272D]/20 text-[#C1272D] text-sm font-medium hover:bg-[#C1272D]/10 transition-all">
                {t("sales_note_action")}
              </Link>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
