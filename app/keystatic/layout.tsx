// Keystatic admin runs with its own full-screen UI; this layout keeps the
// site's global chrome/CSS from interfering with the editor.
export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
