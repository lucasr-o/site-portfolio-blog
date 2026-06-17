"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import LangToggle from "./LangToggle";
import { useLang } from "./LanguageProvider";
import { Arrow, MenuIcon, CloseIcon } from "./icons";

export default function Nav() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const links = [
    { label: t.nav.experience, href: "/#experience" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.about, href: "/#about" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link href="/" className="brand" aria-label="Lucas Reis — home">
          <Logo size={30} />
          <span className="brand-name">
            <span className="bn-1">lucas</span>
            <span className="bn-2">reis</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {links.map((l) =>
            l.href.includes("#") ? (
              <a key={l.href} href={l.href} className="navlink">
                {l.label}
              </a>
            ) : (
              <Link key={l.href} href={l.href} className="navlink">
                {l.label}
              </Link>
            )
          )}
          <LangToggle />
          <a href="/#contact" className="nav-cta">
            {t.nav.cta} <Arrow />
          </a>
        </nav>

        <div className="nav-mobile-controls">
          <LangToggle idSuffix="m" />
          <button
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <div className="container">
          {links.map((l) =>
            l.href.includes("#") ? (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ) : (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            )
          )}
          <a href="/#contact" onClick={() => setOpen(false)}>
            {t.nav.cta} →
          </a>
        </div>
      </div>
    </header>
  );
}
