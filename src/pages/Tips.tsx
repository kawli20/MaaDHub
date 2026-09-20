import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useLanguage } from "@/hooks/useLanguage";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Copy, ExternalLink, HandCoins } from "lucide-react";

interface TipOption {
  key: string;
  label: string;
  value: string;
  isLink?: boolean;
}

export default function Tips() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState<string | null>(null);

  const options: TipOption[] = [
    {
      key: "btc",
      label: t("tips_option_btc"),
      value: "bc1q2edf5k6vnclsvka2nqkj2zaht65dwl3qh3ru98",
    },
    {
      key: "trx",
      label: t("tips_option_trx"),
      value: "TQDBEHXVHMvBammYEco7NR8zYYdRSyTLdz",
    },
    {
      key: "sol",
      label: t("tips_option_sol"),
      value: "EABbhCzJDnzJDET5ifh5r4MRLW4jZt1TKL8ussePEg8g",
    },
    {
      key: "paypal",
      label: t("tips_option_paypal"),
      value: "https://www.paypal.com/paypalme/maadhub",
      isLink: true,
    },
  ];

  const handleCopy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied(null);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-[#C1272D] text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              {t("saved_back")}
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <HandCoins className="w-6 h-6 text-[#C1272D]" />
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {t("tips_title_1")} <span className="text-gradient">{t("tips_title_2")}</span>
              </h1>
            </div>
            <p className="text-white/40 text-sm mb-10 max-w-2xl">{t("tips_desc")}</p>
          </motion.div>

          <div className="space-y-4">
            {options.map((option, index) => (
              <motion.div
                key={option.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="glass-card p-5 rounded-2xl border border-white/10"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="text-white font-semibold mb-1">{option.label}</h3>
                    <p className="text-white/40 text-sm break-all">{option.value}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {option.isLink ? (
                      <a
                        href={option.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C1272D]/10 text-[#C1272D] hover:bg-[#C1272D]/20 transition-all text-sm font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {t("tips_open")}
                      </a>
                    ) : (
                      <button
                        onClick={() => handleCopy(option.value, option.key)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/80 hover:bg-white/10 transition-all text-sm font-medium"
                      >
                        <Copy className="w-4 h-4" />
                        {copied === option.key ? t("tips_copied") : t("tips_copy")}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
