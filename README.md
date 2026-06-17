# Lucas Reis — Security Researcher Portfolio

A dark, editorial personal-brand site for an information-security researcher.
Built with **Next.js (App Router) + React**, hand-written CSS, and zero UI
dependencies — fully static, ~105 KB first load, loads fast on any device.

Aesthetic: serif display (Fraunces) + monospace (JetBrains Mono), near-black
canvas, a single electric-cyan signal accent, subtle scanline atmosphere, an
animated recon "terminal" in the hero, and tasteful scroll-reveal motion that
respects `prefers-reduced-motion`.

## Blog & CMS (Keystatic)

Posts are Markdown (`.mdoc` + frontmatter) under `content/posts/`, rendered at
`/blog` and `/blog/<slug>` with a sticky table of contents, syntax-highlighted
code, and a cover/in-body images. Edit them through the **Keystatic** admin.

### Accessing the admin

The admin is protected by two layers (both enforced in `middleware.ts`):

1. **Secret entry path** — go to **`/keystatic-4e411f3d`**. It sets an unlock
   cookie and forwards you to the editor. Hitting `/keystatic` directly without
   that cookie returns **404** (hidden from scanners).
   > Keystatic hardcodes its UI at `/keystatic` internally, so the working URL
   > normalizes to `/keystatic` after entry — but it's unreachable without the
   > secret path **and** the password below.
2. **Username / password** — a browser login popup (HTTP Basic Auth).

Credentials live only in env vars — copy `.env.example` to `.env.local` and set
`ADMIN_USER`, `ADMIN_PASSWORD`, `ADMIN_GATE`. **`.env.local` is gitignored; never
commit it.** ⚠ Rotate any credentials that were shared over chat.

On Vercel, add the same env vars under Project → Settings → Environment Variables.

### Local editing vs. publishing from the live site

- **Local (default):** with no GitHub env vars set, Keystatic runs in **local
  mode** and writes files straight into the repo. Publish by committing +
  pushing (Vercel auto-deploys).
- **Live site:** to create/edit posts on the deployed site, Keystatic needs
  **GitHub mode** (it commits via a GitHub App). Run the setup wizard linked
  inside the admin to create the App, then fill these in `.env.local` (and on
  Vercel): `NEXT_PUBLIC_KEYSTATIC_REPO_OWNER`, `NEXT_PUBLIC_KEYSTATIC_REPO_NAME`,
  `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`, `KEYSTATIC_GITHUB_CLIENT_ID`,
  `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`. The config switches to
  GitHub mode automatically once `REPO_OWNER`/`REPO_NAME` are present.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm run start   # production
```

## Deploy — Raspberry Pi 4 + Cloudflare Tunnel

This is a Node app (middleware + Keystatic admin), not a static export — it runs
with `next start`. Self-hosted on a Pi, Keystatic runs in **local mode**: posts
written through the admin land as `.mdoc` files on the Pi's disk, and because
`/blog` is dynamic they appear immediately, no rebuild. No GitHub App needed.

### 1. Push the code to GitHub (from your dev machine)

```bash
cd ~/Códigos/site-lucas-reis
git init -b main
git add -A
git status                 # ⚠ confirm .env.local is NOT listed (it's gitignored)
git commit -m "Portfolio + blog"
gh repo create lucas-reis-site --public --source=. --remote=origin --push
# (or: git remote add origin git@github.com:<user>/<repo>.git && git push -u origin main)
```

### 2. Set up the app on the Pi

```bash
# Node 20 LTS (ARM64)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git

git clone https://github.com/<user>/<repo>.git ~/site-lucas-reis
cd ~/site-lucas-reis
npm ci

# .env.local is gitignored, so create it on the Pi (USE A NEW PASSWORD):
cat > .env.local <<'EOF'
ADMIN_USER=admin_lucas_554_tatu
ADMIN_PASSWORD=<nova-senha-forte>
ADMIN_GATE=3d1233a738f83bea4e900dc0ed6f754e48abc62f580b3504
EOF
chmod 600 .env.local

npm run build              # if the build is OOM-killed on a 2GB Pi, add ~2GB swap
npm run start &            # quick test → should serve on http://localhost:3000
curl -I http://localhost:3000   # expect HTTP 200, then Ctrl-C the test
```

### 3. Keep it running (systemd)

`sudo nano /etc/systemd/system/lucas-reis.service`:

```ini
[Unit]
Description=Lucas Reis site (Next.js)
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/home/pi/site-lucas-reis
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/npm run start
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now lucas-reis
sudo systemctl status lucas-reis
```

`next start` auto-loads `.env.local`, so the admin credentials are picked up.

### 4. Point the Cloudflare Tunnel at it

**If your tunnel is dashboard-managed** (Zero Trust → Networks → Tunnels):
add a **Public Hostname** → `lucas-reis.com`, type `HTTP`, URL
`http://localhost:3000`. (Repeat for `www` if you want it.) DNS is created
automatically.

**If it's config-file managed** (`~/.cloudflared/config.yml` on the Pi):

```yaml
tunnel: <TUNNEL-ID>
credentials-file: /home/pi/.cloudflared/<TUNNEL-ID>.json
ingress:
  - hostname: lucas-reis.com
    service: http://localhost:3000
  - hostname: www.lucas-reis.com
    service: http://localhost:3000
  - service: http_status:404
```

```bash
cloudflared tunnel route dns <TUNNEL-NAME> lucas-reis.com
cloudflared tunnel route dns <TUNNEL-NAME> www.lucas-reis.com
sudo systemctl restart cloudflared
```

In the Cloudflare dashboard for `lucas-reis.com`: enable **Always Use HTTPS**
(SSL/TLS → Edge Certificates). The tunnel already encrypts Cloudflare↔Pi.

### 5. Write posts on the live site

Go to **`https://lucas-reis.com/keystatic-4e411f3d`** → login (user/password) →
create posts. They save to the Pi and show up at `/blog` instantly.

### 6. Backup posts to GitHub (recommended)

Posts created on the Pi live only on its disk. A cron keeps them backed up:

```bash
# crontab -e  (runs every 30 min; commits new/changed content if any)
*/30 * * * * cd /home/pi/site-lucas-reis && git add content public/images/blog && git diff --cached --quiet || git commit -m "posts: $(date -Iseconds)" && git push
```

### Updating the code later

```bash
cd ~/site-lucas-reis && git pull && npm ci && npm run build && sudo systemctl restart lucas-reis
```

### Security checklist

- ⚠ **Rotate `ADMIN_PASSWORD`** — the one shared in chat should not be the live one.
- `.env.local` stays on the Pi only, never committed (gitignored).
- Admin is gated by the secret path + Basic Auth. For an extra layer, put
  **Cloudflare Access** (Zero Trust) in front of `/keystatic*` for email-OTP login.

## Editing content (this is placeholder copy)

All visitor-facing text lives in **`lib/data.ts`** — edit it in one place:

| What | Where in `lib/data.ts` |
|------|------------------------|
| Name, email, social handles | `PROFILE` |
| "Recognised by" logos | `RECOGNITION` |
| Stat counters (reports, CVEs, bounties, HoF) | `STATS` |
| Research / writeup rows | `WRITEUPS` |
| Hero terminal "session" lines | `TERMINAL_LINES` |

Longer prose (the About bio paragraphs, hero headline, contact blurb) lives
directly in the matching component under `components/`.

**Portrait:** the About section uses a styled placeholder box. Drop in a real
photo with `next/image` in `components/About.tsx` (replace the `.portrait`
block).

## Structure

```
app/
  layout.tsx      # fonts, metadata, <html>
  page.tsx        # assembles the sections
  globals.css     # the entire design system + animations
components/
  Nav.tsx         # sticky nav, scroll state, mobile menu
  Hero.tsx        # headline + animated terminal + recognition strip
  Terminal.tsx    # typing animation (reduced-motion aware)
  About.tsx       # bio, stats, socials
  Research.tsx    # writeups / disclosures list
  Contact.tsx     # CTA, big wordmark, footer
  Reveal.tsx      # IntersectionObserver scroll-reveal wrapper
  icons.tsx       # inline SVG icons + brand mark (no emoji)
lib/
  data.ts         # ← all placeholder content
```

## Accessibility & performance notes

- Respects `prefers-reduced-motion` (animations + typing disabled).
- Semantic landmarks, focus-visible defaults, `aria-label`s on icon controls.
- Self-hosted fonts via `next/font` (no layout shift, no third-party requests).
- No images, no client UI libraries — minimal JS.
