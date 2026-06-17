/* eslint-disable @next/next/no-img-element */

// Markdown wraps standalone images in a <p>, so we use inline <span>s (styled
// as blocks in CSS) to keep the HTML valid — <figure> inside <p> is illegal.
// Captions come from the image title attribute.
export function PostImage({
  src,
  alt,
  title,
}: {
  src: string;
  alt?: string;
  title?: string;
}) {
  return (
    <span className="post-figure">
      <img src={src} alt={alt || ""} loading="lazy" className="post-img" />
      {title ? <span className="post-figcaption">{title}</span> : null}
    </span>
  );
}
