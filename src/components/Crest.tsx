/**
 * Club crest. Uses the real mark recolored white for dark surfaces
 * (/media/crest-white.png, generated from Amsterdam_Tigers_logo.png).
 * Sizing comes from the caller via className (e.g. "h-9 w-9").
 */
export function Crest({
  className,
  title = "Amsterdam Tigers",
}: {
  className?: string;
  title?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/media/crest-white.png"
      alt={title}
      className={`object-contain ${className ?? ""}`}
      draggable={false}
    />
  );
}
