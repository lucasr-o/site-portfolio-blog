import { config, fields, collection } from "@keystatic/core";

// Git-based CMS. Locally it writes Markdown (.mdoc) + images straight to the
// repo. In production (where the filesystem is read-only) it commits via GitHub
// mode — set NEXT_PUBLIC_KEYSTATIC_REPO_OWNER / _NAME and the GitHub App env
// vars (see README) and it switches automatically.
const repoOwner = process.env.NEXT_PUBLIC_KEYSTATIC_REPO_OWNER;
const repoName = process.env.NEXT_PUBLIC_KEYSTATIC_REPO_NAME;

const storage =
  repoOwner && repoName
    ? ({ kind: "github", repo: { owner: repoOwner, name: repoName } } as const)
    : ({ kind: "local" } as const);

export default config({
  storage,
  ui: {
    brand: { name: "Lucas Reis" },
  },
  collections: {
    posts: collection({
      label: "Blog posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      columns: ["title", "date"],
      schema: {
        title: fields.slug({
          name: { label: "Title" },
          slug: { label: "URL slug" },
        }),
        date: fields.date({
          label: "Publish date",
          defaultValue: { kind: "today" },
        }),
        excerpt: fields.text({
          label: "Excerpt",
          description: "Short summary shown on the blog index.",
          multiline: true,
        }),
        cover: fields.image({
          label: "Cover image",
          directory: "public/images/blog",
          publicPath: "/images/blog/",
        }),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "public/images/blog",
              publicPath: "/images/blog/",
            },
          },
        }),
      },
    }),
  },
});
