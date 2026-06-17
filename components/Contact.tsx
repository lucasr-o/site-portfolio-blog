"use client";

import Reveal from "./Reveal";
import Logo from "./Logo";
import { Arrow, ArrowUpRight } from "./icons";
import { useLang } from "./LanguageProvider";
import { PROFILE } from "@/lib/data";

export default function Contact() {
  const { t } = useLang();
  const c = t.contact;
  const year = new Date().getFullYear();

  // keep the green "ok" while still translating the line
  const hsParts = c.handshake.split(/(ok)/);

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-cta">
          <Reveal>
            <span className="eyebrow">{c.eyebrow}</span>
            <h2>
              {c.h2a} <span className="italic accent">{c.h2b}</span>
            </h2>
            <p className="sub">{c.sub}</p>
            <a href={`mailto:${PROFILE.email}`} className="btn btn-primary">
              {PROFILE.email} <Arrow />
            </a>
          </Reveal>
        </div>

        <Reveal>
          <div className="bigmark" aria-hidden="true">
            <Logo size={92} />
            <span className="word">
              <span className="bm-1">lucas</span>
              <span className="bm-2">reis</span>
            </span>
          </div>
        </Reveal>

        <div className="footer-cols">
          <div className="fcol">
            <h4>Lucas Reis</h4>
            <p className="blurb">{c.blurb}</p>
          </div>

          <div className="fcol">
            <h4>{c.practice}</h4>
            <ul>
              {c.practiceItems.map((item, i) => (
                <li key={i}>
                  <a href="/#experience">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="fcol">
            <h4>{c.writing}</h4>
            <ul>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/#experience">{t.nav.experience}</a></li>
              <li><a href="/#about">{t.nav.about}</a></li>
            </ul>
          </div>

          <div className="fcol">
            <h4>{c.contact}</h4>
            <ul>
              <li><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></li>
              <li><a href={PROFILE.linkedin.href} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a></li>
              <li><a href={PROFILE.github.href} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a></li>
              <li><a href={PROFILE.x.href} target="_blank" rel="noreferrer">{PROFILE.x.label} <ArrowUpRight /></a></li>
            </ul>
          </div>
        </div>

        <div className="footer-meta">
          <span>© {year} Lucas Reis · {c.rights}</span>
          <span className="hs">
            {hsParts.map((part, i) =>
              part === "ok" ? (
                <span className="ok" key={i}>
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </span>
        </div>
      </div>
    </section>
  );
}
