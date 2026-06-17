"use client";

import { Arrow } from "./icons";
import Terminal from "./Terminal";
import Beams from "./Beams";
import RotatingWords from "./RotatingWords";
import { useLang } from "./LanguageProvider";
import RecogLogo from "./RecogLogo";
import { rich } from "@/lib/rich";
import { RECOGNITION } from "@/lib/data";

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;

  return (
    <>
      <section className="hero-wrap" id="top">
        <div className="hero-beams">
          <Beams intensity="subtle" />
        </div>

        <div className="hero container">
          <div className="hero-grid">
            <div>
              <p className="eyebrow rise d1">{h.eyebrow}</p>

              <h1 style={{ marginTop: "22px" }}>
                <span className="rise d2" style={{ display: "block" }}>
                  {h.line1}
                </span>
                <span className="rise d3" style={{ display: "block" }}>
                  <RotatingWords words={h.words} />
                </span>
                <span className="rise d4" style={{ display: "block" }}>
                  {h.line3}
                </span>
              </h1>

              <p className="hero-sub rise d5">{rich(h.sub)}</p>

              <div className="hero-cta rise d6">
                <a href="#experience" className="btn btn-primary">
                  {h.ctaPrimary} <Arrow />
                </a>
                <a href="#contact" className="btn btn-ghost">
                  {h.ctaSecondary} <Arrow />
                </a>
              </div>
            </div>

            <div className="rise d4 hero-term-cell">
              <Terminal />
            </div>
          </div>
        </div>
      </section>

      <div className="recog">
        <div className="container recog-inner">
          <span className="recog-label">{h.recog}</span>
          <div className="recog-marquee">
            <div className="recog-track">
              {[...RECOGNITION, ...RECOGNITION].map((item, i) => (
                <span
                  className="recog-item"
                  key={i}
                  aria-hidden={i >= RECOGNITION.length}
                >
                  <RecogLogo item={item} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
