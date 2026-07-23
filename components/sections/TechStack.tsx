import { techStack } from '@/lib/data'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SkillChip } from '@/components/ui/SkillChip'

export function TechStack() {
  return (
    <section id="stack" className="px-7 py-7 border-b" style={{ borderColor: 'var(--border)' }}>
      <SectionLabel>tech_stack</SectionLabel>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {techStack.map((cat) => (
          <div key={cat.category}
               className="rounded-lg p-4"
               style={{ background: 'var(--surface)', border: '0.5px solid var(--border)' }}>
            <div className="mb-3 text-[10px] tracking-wider uppercase"
                 style={{ fontFamily: 'var(--font-mono)', color: 'var(--purple-l)' }}>
              {cat.category}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((item) => <SkillChip key={item} label={item} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
