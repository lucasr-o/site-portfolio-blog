"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Adapted from the "animated-hero" rotating title. Restyled to this site's
// serif-italic cyan accent. Words come from the active language. Falls back to
// a single static word when the user prefers reduced motion.

export default function RotatingWords({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Reset to the first word whenever the language (word list) changes.
  useEffect(() => {
    setIndex(0);
  }, [words]);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(
      () => setIndex((prev) => (prev + 1) % words.length),
      2400
    );
    return () => clearTimeout(t);
  }, [index, reduce, words]);

  if (reduce) {
    return <span className="italic accent">{words[0]}</span>;
  }

  return (
    <span className="rotwords" aria-label={words.join(", ")}>
      &nbsp;
      {words.map((word, i) => (
        <motion.span
          key={word}
          className="rotword italic accent"
          aria-hidden="true"
          initial={{ opacity: 0, y: "-110%" }}
          transition={{
            y: { type: "spring", stiffness: 60, damping: 15 },
            opacity: { duration: 0.22, ease: "easeOut" },
          }}
          animate={
            index === i
              ? { y: 0, opacity: 1 }
              : { y: index > i ? "-130%" : "130%", opacity: 0 }
          }
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
