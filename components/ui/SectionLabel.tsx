export function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{fontFamily:'var(--font-mono)',color:'var(--muted2)'}}
         className="flex items-center gap-2 text-[10px] uppercase tracking-widest mb-5">
      <span style={{color:'var(--purple-l)'}}>{'// '}</span>
      {children}
    </div>
  )
}
