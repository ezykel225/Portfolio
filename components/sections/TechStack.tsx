import { techStack } from '@/lib/data'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { SkillChip } from '@/components/ui/SkillChip'

export function TechStack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="border-b border-[var(--border)] px-5 py-9 sm:px-7 sm:py-11"
    >
      <SectionLabel as="h2" id="stack-heading" index="02">
        tech_stack
      </SectionLabel>
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {techStack.map((cat) => (
          <div key={cat.category} className="panel rounded-lg p-4">
            <h3 className="mb-3 font-mono text-[10px] tracking-wider uppercase text-[var(--purple-l)]">
              {cat.category}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {cat.items.map((item) => (
                <li key={item}>
                  <SkillChip label={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
