/**
 * Every section opens the same way: a hairline across the content width,
 * one indigo cell at its left edge, and a mono index label. The cell is the
 * brand motif used as structure rather than decoration.
 */
export function SectionRule({ index, label }: { index: string; label: string }) {
  return (
    <div className="section-rule">
      <span aria-hidden="true" className="cell" />
      <p className="label">
        {index} / {label}
      </p>
    </div>
  );
}
