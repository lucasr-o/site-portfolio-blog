import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Logo from "@/components/Logo";
import { ArrowUpRight } from "@/components/icons";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Blog — Lucas Reis",
  description:
    "Security notes, writeups, and things I learn along the way — by Lucas Reis.",
};

// Self-hosted (Pi) with Keystatic local mode: posts are written to disk at
// runtime, so render on demand instead of baking the list at build time.
export const dynamic = "force-dynamic";

const PER_PAGE = 9;

function pageHref(n: number) {
  return n <= 1 ? "/blog" : `/blog?page=${n}`;
}

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const all = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(all.length / PER_PAGE));
  const sp = await searchParams;
  const page = Math.min(Math.max(1, Number(sp?.page) || 1), totalPages);
  const posts = all.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <Nav />
      <main className="blog-index">
        <div className="container">
          <header className="blog-head">
            <p className="eyebrow">Writing</p>
            <h1 className="blog-h1">
              Notes &amp; <span className="italic accent">writeups.</span>
            </h1>
          </header>

          {all.length === 0 ? (
            <p className="post-empty">
              No posts yet. Create one in the{" "}
              <a href="/keystatic" className="link-u">
                editor
              </a>
              .
            </p>
          ) : (
            <>
              <div className="post-list">
                {posts.map((p) => (
                  <Link href={`/blog/${p.slug}`} className="post-card" key={p.slug}>
                    <div className="post-card-media">
                      {p.cover ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.cover} alt="" loading="lazy" />
                      ) : (
                        <div className="post-card-fallback">
                          <Logo size={44} />
                        </div>
                      )}
                    </div>
                    <div className="post-card-body">
                      <p className="post-card-date">{formatDate(p.date)}</p>
                      <h2 className="post-card-title">{p.title}</h2>
                      {p.excerpt && (
                        <p className="post-card-excerpt">{p.excerpt}</p>
                      )}
                      <span className="post-card-read">
                        Read <ArrowUpRight />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <nav className="pager" aria-label="Pagination">
                  <Link
                    className={`${page === 1 ? "disabled" : ""}`}
                    href={pageHref(page - 1)}
                    aria-label="Previous page"
                  >
                    ←
                  </Link>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) =>
                    n === page ? (
                      <span className="current" key={n} aria-current="page">
                        {n}
                      </span>
                    ) : (
                      <Link href={pageHref(n)} key={n}>
                        {n}
                      </Link>
                    )
                  )}
                  <Link
                    className={`${page === totalPages ? "disabled" : ""}`}
                    href={pageHref(page + 1)}
                    aria-label="Next page"
                  >
                    →
                  </Link>
                </nav>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
