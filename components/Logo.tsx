// Brand mark — themed German Shepherd ("guard dog") logo from /public/logo.svg.
// Recolored to the cyan + soft-white palette so it reads on the dark canvas.

export default function Logo({
  size = 28,
  glow = true,
  className = "",
}: {
  size?: number;
  glow?: boolean;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.svg"
      alt="Lucas Reis"
      width={size}
      height={size}
      className={`logo-img ${glow ? "logo-glow" : ""} ${className}`}
      style={{ width: size, height: size }}
      draggable={false}
    />
  );
}
