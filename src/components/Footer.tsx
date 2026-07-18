import { Link } from "react-router";
import { Gamepad2, Heart, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

export function Footer() {
  const { t } = useLanguage();

  const links = [
    { to: "/", label: t("nav_home") },
    { to: "/saved", label: t("nav_saved") },
    { to: "/contact", label: t("nav_contact") },
    { to: "/about", label: t("nav_about") },
  ];

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#030303]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="MaaDHub" className="w-8 h-8 object-contain" />
              <span className="text-lg font-bold text-white">
                MaaD<span className="text-[#C1272D]">Hub</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm max-w-sm leading-relaxed">{t("footer_desc")}</p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">{t("footer_quick_links")}</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/40 hover:text-[#C1272D] text-sm transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">{t("footer_platforms")}</h3>
            <ul className="space-y-2">
              {["Steam", "Epic Games", "Xbox", "PlayStation", "Netflix"].map((platform) => (
                <li key={platform} className="text-white/40 text-sm flex items-center gap-2">
                  <Gamepad2 className="w-3 h-3" />
                  {platform}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/30 text-xs flex items-center gap-1">
            {t("footer_credits")} <Heart className="w-3 h-3 text-[#C1272D]" /> {t("footer_by")}
          </p>
          <a
            href="https://maad.qzz.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-[#C1272D] text-xs flex items-center gap-1 transition-colors"
          >
            maad.qzz.io <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
