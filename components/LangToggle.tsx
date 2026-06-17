"use client";

import { motion } from "framer-motion";
import { useLang } from "./LanguageProvider";
import type { Lang } from "@/lib/i18n";

const OPTIONS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
];

export default function LangToggle({ idSuffix = "d" }: { idSuffix?: string }) {
  const { lang, setLang } = useLang();

  return (
    <div className="lang-toggle" role="group" aria-label="Language / Idioma">
      {OPTIONS.map((opt) => {
        const active = lang === opt.code;
        return (
          <button
            key={opt.code}
            type="button"
            className={`lang-opt ${active ? "active" : ""}`}
            onClick={() => setLang(opt.code)}
            aria-pressed={active}
            aria-label={opt.code === "en" ? "English" : "Português"}
          >
            {active && (
              <motion.span
                layoutId={`lang-pill-${idSuffix}`}
                className="lang-pill"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span className="lang-label">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
