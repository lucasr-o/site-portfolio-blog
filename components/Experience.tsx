"use client";

import Reveal from "./Reveal";
import { useLang } from "./LanguageProvider";

export default function Experience() {
  const { t } = useLang();
  const x = t.experience;

  return (
    <section className="section-pad" id="experience">
      <div className="container">
        <div className="sec-head">
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: "18px" }}>
              {x.eyebrow}
            </p>
            <h2>
              {x.h2a} <span className="italic accent">{x.h2b}</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="lede">{x.lede}</p>
          </Reveal>
        </div>

        <div className="xp-list">
          {x.items.map((job, i) => (
            <Reveal key={i} delay={i * 50}>
              <article className="xp-row">
                <span className="xp-idx">{String(i + 1).padStart(2, "0")}</span>
                <div className="xp-main">
                  <div className="xp-head">
                    <h3 className="xp-role">{job.role}</h3>
                    <span className="xp-period">{job.period}</span>
                  </div>
                  <p className="xp-org">
                    {job.org} <span className="xp-loc">· {job.loc}</span>
                  </p>
                  <p className="xp-desc">{job.desc}</p>
                  <div className="xp-tags">
                    {job.tags.map((tag) => (
                      <span className="xp-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="certs-wrap">
          <p className="certs-title">{x.certsTitle}</p>
          <div className="certs">
            {x.certs.map((cert) => (
              <div className="cert" key={cert.name}>
                <span className="cert-name">{cert.name}</span>
                <span className="cert-detail">{cert.detail}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
