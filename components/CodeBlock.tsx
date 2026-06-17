import hljs from "highlight.js";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Server-rendered (runs at build for static pages), so highlight.js never ships
// to the client — only the highlighted HTML does.
export function CodeBlock({
  content,
  language,
}: {
  content: string;
  language?: string;
}) {
  const code = (content ?? "").replace(/\n$/, "");
  let html = "";
  let lang = language;
  try {
    if (language && hljs.getLanguage(language)) {
      html = hljs.highlight(code, { language }).value;
    } else {
      const result = hljs.highlightAuto(code);
      html = result.value;
      lang = result.language ?? language;
    }
  } catch {
    html = escapeHtml(code);
  }

  return (
    <div className="code-block">
      <div className="code-bar">
        <span className="code-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="code-lang">{lang || "text"}</span>
      </div>
      <pre>
        <code className="hljs" dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}
