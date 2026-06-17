import { NextResponse, type NextRequest } from "next/server";

// Protects the Keystatic admin. Two layers:
//   1. Obscurity gate — the admin (/keystatic*, /api/keystatic*) returns 404
//      unless you arrived via the secret entry path, which sets a cookie.
//   2. Basic Auth — username/password (browser login popup) on top of that.
// Credentials live only in env vars (never committed). Fails closed.

const SECRET_ENTRY = "/keystatic-4e411f3d";
const GATE_COOKIE = "ks_gate";
const REALM = 'Basic realm="Lucas Reis Admin", charset="UTF-8"';

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

function hasValidCredentials(req: NextRequest): boolean {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) return false; // not configured → deny

  const header = req.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;

  let decoded = "";
  try {
    decoded = atob(header.slice(6));
  } catch {
    return false;
  }
  const sep = decoded.indexOf(":");
  if (sep === -1) return false;
  const u = decoded.slice(0, sep);
  const p = decoded.slice(sep + 1);
  return safeEqual(u, user) && safeEqual(p, pass);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const gate = process.env.ADMIN_GATE;

  // 1. Secret entry: drop the gate cookie, then send the user into the admin.
  if (pathname === SECRET_ENTRY) {
    const url = req.nextUrl.clone();
    url.pathname = "/keystatic";
    // behind Cloudflare Tunnel the origin sees HTTP; keep the redirect on HTTPS
    if (req.headers.get("x-forwarded-proto") === "https") {
      url.protocol = "https:";
    }
    const res = NextResponse.redirect(url);
    if (gate) {
      res.cookies.set(GATE_COOKIE, gate, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 8,
      });
    }
    return res;
  }

  // 2. Obscurity: hide the admin from anyone who didn't come through the gate.
  if (!gate || req.cookies.get(GATE_COOKIE)?.value !== gate) {
    return new NextResponse("Not found", { status: 404 });
  }

  // 3. Username / password.
  if (!hasValidCredentials(req)) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": REALM },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/keystatic-4e411f3d",
    "/keystatic",
    "/keystatic/:path*",
    "/api/keystatic/:path*",
  ],
};
