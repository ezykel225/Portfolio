export function SkillChip({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        background: 'var(--surface2)',
        border: '0.5px solid var(--border)',
        color: 'var(--muted)',
      }}
      className="text-[10.5px] px-2.5 py-1 rounded hover:border-purple-500 hover:text-purple-400 transition-colors cursor-default"
    >
      {label}
    </span>
  )
}
