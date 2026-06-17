"use client";

import Reveal from "./Reveal";
import Logo from "./Logo";
import { XIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import { useLang } from "./LanguageProvider";
import { rich } from "@/lib/rich";
import { FACTS, PROFILE } from "@/lib/data";

export default function About() {
  const { t } = useLang();
  const a = t.about;

  return (
    <section className="section-pad" id="about">
      <div className="container">
        <div className="about-grid">
          <Reveal>
            <div className="portrait">
              <span className="glyph">
                <Logo size={120} />
              </span>
              <span className="ptag">// portrait.jpg</span>
            </div>
          </Reveal>

          <div className="about-body">
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: "20px" }}>
                {a.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={60}>
              <p>{rich(a.p1)}</p>
            </Reveal>

            <Reveal delay={120}>
              <p>{rich(a.p2)}</p>
            </Reveal>

            <Reveal delay={180}>
              <p>{rich(a.p3)}</p>
            </Reveal>

            <Reveal delay={120}>
              <div className="stats">
                {FACTS.map((f, i) => (
                  <div className="stat" key={i}>
                    <div className="num">
                      {f.accent ? <span className="accent">{f.value}</span> : f.value}
                    </div>
                    <div className="lab">{a.facts[i]}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="socials">
                <a className="social" href={PROFILE.linkedin.href} target="_blank" rel="noreferrer">
                  <LinkedInIcon /> {PROFILE.linkedin.label}
                </a>
                <a className="social" href={PROFILE.github.href} target="_blank" rel="noreferrer">
                  <GitHubIcon /> {PROFILE.github.label}
                </a>
                <a className="social" href={PROFILE.x.href} target="_blank" rel="noreferrer">
                  <XIcon /> {PROFILE.x.label}
                </a>
                <a className="social" href={`mailto:${PROFILE.email}`}>
                  <MailIcon /> {PROFILE.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
