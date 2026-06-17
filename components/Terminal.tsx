"use client";

import { useEffect, useState } from "react";
import { TERMINAL_LINES } from "@/lib/data";

/**
 * Types the recon "session" line-by-line, then drops a verified badge
 * and a blinking prompt. Reduced-motion users see the full session at once.
 */
export default function Terminal() {
  const [visibleCount, setVisibleCount] = useState(0); // fully shown lines
  const [partial, setPartial] = useState(""); // currently typing line text
  const [done, setDone] = useState(false);
  useEffect(() => {
    // Reset on every mount (e.g. navigating back to the home page) and let the
    // cleanup cancel timers — this is StrictMode-safe without a "started" guard,
    // which previously froze the animation after a client-side re-mount.
    setVisibleCount(0);
    setPartial("");
    setDone(false);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisibleCount(TERMINAL_LINES.length);
      setDone(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let line = 0;
    let char = 0;

    const tick = () => {
      if (line >= TERMINAL_LINES.length) {
        setDone(true);
        return;
      }
      const full = TERMINAL_LINES[line].text;

      if (full.length === 0) {
        // blank spacer line — just commit it
        setVisibleCount(line + 1);
        line += 1;
        char = 0;
        timers.push(setTimeout(tick, 120));
        return;
      }

      if (char <= full.length) {
        setPartial(full.slice(0, char));
        char += 1;
        timers.push(setTimeout(tick, 14 + Math.random() * 16));
      } else {
        // line finished
        setVisibleCount(line + 1);
        setPartial("");
        line += 1;
        char = 0;
        timers.push(setTimeout(tick, 260));
      }
    };

    timers.push(setTimeout(tick, 600));
    return () => timers.forEach(clearTimeout);
  }, []);

  const typingLine = visibleCount < TERMINAL_LINES.length ? TERMINAL_LINES[visibleCount] : null;

  return (
    <div className="terminal" role="img" aria-label="Terminal session: discovering and proving an alg=none JWT forgery vulnerability">
      <div className="term-bar">
        <span className="term-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="term-title">
          recon · <span className="accent">hunting api.target.internal</span>
        </span>
      </div>
      <div className="term-body" aria-hidden="true">
        {TERMINAL_LINES.slice(0, visibleCount).map((l, i) => (
          <span key={i} className={`term-line ${l.cls ?? ""}`}>
            {l.text || " "}
          </span>
        ))}

        {typingLine && partial.length > 0 && (
          <span className={`term-line ${typingLine.cls ?? ""}`}>
            {partial}
            <span className="cursor" />
          </span>
        )}

        {done && (
          <>
            <span className="term-line">{" "}</span>
            <span className="term-line">
              <span className="t-verified">chain verified · severity crit (9.1) · 43.7s</span>
            </span>
            <span className="term-line">
              <span className="t-prompt">server ~ $</span>
              <span className="cursor" />
            </span>
          </>
        )}
      </div>
    </div>
  );
}
