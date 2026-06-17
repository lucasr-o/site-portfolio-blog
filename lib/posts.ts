import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: string | null;
}

function listFiles(): string[] {
  try {
    return fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdoc"));
  } catch {
    return [];
  }
}

export function getAllPostSlugs(): string[] {
  return listFiles().map((f) => f.replace(/\.mdoc$/, ""));
}

export function getPostRaw(slug: string): { data: Record<string, unknown>; content: string } {
  const full = path.join(POSTS_DIR, `${slug}.mdoc`);
  const file = fs.readFileSync(full, "utf8");
  const { data, content } = matter(file);
  return { data, content };
}

function normalizeCover(cover: unknown): string | null {
  if (typeof cover !== "string" || !cover) return null;
  if (cover.startsWith("/") || cover.startsWith("http")) return cover;
  return `/images/blog/${cover}`;
}

export function getPostMeta(slug: string): PostMeta {
  const { data } = getPostRaw(slug);
  return {
    slug,
    title: (data.title as string) ?? slug,
    date: data.date ? String(data.date) : "",
    excerpt: (data.excerpt as string) ?? "",
    cover: normalizeCover(data.cover),
  };
}

export function getAllPosts(): PostMeta[] {
  return getAllPostSlugs()
    .map(getPostMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
