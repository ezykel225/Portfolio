export function SkillChip({ label }: { label: string }) {
  return (
    <span className="inline-block cursor-default rounded border-[0.5px] border-[var(--border)] bg-[var(--surface2)] px-2.5 py-1 font-mono text-[10.5px] text-[var(--muted)] transition-colors hover:border-[var(--purple)] hover:text-[var(--purple-l)]">
      {label}
    </span>
  )
}
