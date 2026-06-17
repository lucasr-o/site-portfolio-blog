/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // a stray parent-dir lockfile makes Next mis-infer the workspace root
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
