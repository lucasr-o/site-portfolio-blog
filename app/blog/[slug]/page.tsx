import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import BlogToc from "@/components/BlogToc";
import { Arrow } from "@/components/icons";
import { getPostMeta, getPostRaw } from "@/lib/posts";
import { renderMarkdoc } from "@/lib/markdoc";
import { formatDate } from "@/lib/format";

// Render on demand so posts created/edited via Keystatic on the Pi (local mode,
// written to disk at runtime) show up immediately without a rebuild.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const meta = getPostMeta(slug);
    return {
      title: `${meta.title} — Lucas Reis`,
      description: meta.excerpt,
      openGraph: {
        title: meta.title,
        description: meta.excerpt,
        images: meta.cover ? [meta.cover] : undefined,
      },
    };
  } catch {
    return { title: "Post — Lucas Reis" };
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let raw;
  try {
    raw = getPostRaw(slug);
  } catch {
    notFound();
  }

  const meta = getPostMeta(slug);
  const { rendered, toc } = renderMarkdoc(raw.content);

  return (
    <>
      <Nav />
      <main className="post-main">
        <div className="container post-layout">
          <aside className="post-toc-col">
            <BlogToc items={toc} />
          </aside>

          <article className="post-article">
            <Link href="/blog" className="back-link">
              <span className="back-arrow">
                <Arrow />
              </span>
              Back to writing
            </Link>

            <p className="post-meta-top">
              <span className="post-date">{formatDate(meta.date)}</span>
              <span className="post-byline"> · Lucas Reis</span>
            </p>

            <h1 className="post-title">{meta.title}</h1>
            {meta.excerpt && <p className="post-lede">{meta.excerpt}</p>}

            {meta.cover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={meta.cover} alt="" className="post-cover" />
            )}

            <div className="prose">{rendered}</div>
          </article>
        </div>
      </main>
    </>
  );
}
