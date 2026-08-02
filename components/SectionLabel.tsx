/** Monospace section marker styled like a source comment: `// projects`. */
export default function SectionLabel({
  children,
  className = '',
}: {
  children: string;
  className?: string;
}) {
  return (
    <p className={`font-mono text-xs uppercase tracking-widest text-fg-faint ${className}`}>
      <span className="text-accent/70">{'//'}</span> {children}
    </p>
  );
}
