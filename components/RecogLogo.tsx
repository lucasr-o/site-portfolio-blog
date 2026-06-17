"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import type { Recog } from "@/lib/data";

// Renders an institution logo (monochrome wall, color on hover). If the image
// file isn't present yet, it falls back to the text label automatically.
export default function RecogLogo({ item }: { item: Recog }) {
  const [failed, setFailed] = useState(false);

  if (item.logo && !failed) {
    return (
      <img
        className="recog-logo"
        src={item.logo}
        alt={item.label}
        onError={() => setFailed(true)}
      />
    );
  }
  return <span className="recog-text">{item.label}</span>;
}
