// ---------------------------------------------------------------------------
// Real profile data (from CV). Translatable copy lives in lib/i18n.ts.
// ---------------------------------------------------------------------------

export const PROFILE = {
  name: "Lucas Reis",
  fullName: "Lucas Reis de Oliveira da Silva",
  email: "contato@lucas-reis.com",
  location: "Santo André · São Paulo",
  github: { label: "@lucasr-o", href: "https://github.com/lucasr-o" },
  linkedin: {
    label: "in/lucas-reis-o",
    href: "https://www.linkedin.com/in/lucas-reis-o/",
  },
  x: { label: "@lucasreis_lk", href: "https://x.com/lucasreis_lk" },
};

// Hero "Background" marquee — institutions & certifying bodies (all real).
// `logo` points to /public/images/logos/*; if the file is missing, the UI falls
// back to the text label automatically (see RecogLogo).
export interface Recog {
  label: string;
  logo?: string;
}
export const RECOGNITION: Recog[] = [
  { label: "PagBank", logo: "/images/logos/pagbank.png" },
  { label: "Go Ahead IT" },
  { label: "UFABC", logo: "/images/logos/ufabc.png" },
  { label: "SENAI-SP", logo: "/images/logos/senai.png" },
  { label: "ISC2" },
  { label: "Cisco", logo: "/images/logos/cisco.png" },
  { label: "University of Cambridge" },
];

// About facts grid — short values; labels are translated (about.facts).
export const FACTS: { value: string; accent?: boolean }[] = [
  { value: "AppSec" },
  { value: "UFABC", accent: true },
  { value: "Green Team" },
  { value: "ISC2" },
];

// Hero terminal "session" — typed out line by line on load. Illustrative recon
// demo (not a specific claim). Kept tight so the panel doesn't grow on finish.
export interface TermLine {
  text: string;
  cls?: string;
}

export const TERMINAL_LINES: TermLine[] = [
  { text: "$ recon --target api.target.internal --scope src", cls: "t-prompt" },
  { text: "→ grep(/jwt\\.verify|decodeJwt/, scope=src)", cls: "t-dim" },
  { text: "  3 hits · middleware/auth.ts:47 · lib/token.ts:22", cls: "t-key" },
  {
    text: "▸ verifier reads `alg` from the header, no allow-list.",
    cls: "t-note",
  },
  { text: "  classic alg=none. worth proving.", cls: "t-note" },
  { text: "▸ proving it", cls: "t-prompt" },
  { text: "  POST /v1/admin/users  auth=forge(alg=none)", cls: "t-key" },
  { text: "  → 200 OK · admin records returned ✓", cls: "t-ok" },
  { text: "▸ writing up", cls: "t-prompt" },
  { text: "  write(out/poc.ts · out/finding.md)", cls: "t-dim" },
];
