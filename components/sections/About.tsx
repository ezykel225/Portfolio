import { personal } from '@/lib/data'
import { SectionLabel } from '@/components/ui/SectionLabel'

/**
 * Names and organisations in the bio are emphasised so the paragraphs
 * stay scannable. This replaces a dangerouslySetInnerHTML + regex
 * approach — same result, but the content is never parsed as HTML.
 */
const EMPHASISED = [
  'Ezequel',
  'Asian College of Science and Technology',
  'Dumaguete, Central Visayas, Philippines',
  'barangay e-processing system',
  'React Native fitness app',
  'ECE Contact Centers',
  'Inspiro/Infocom',
  'Remotasks PH',
  'Outlier AI',
  'Qualfon Dumaguete',
]

function emphasise(text: string) {
  const pattern = new RegExp(`(${EMPHASISED.map((t) => t.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')).join('|')})`, 'g')
  return text.split(pattern).map((part, i) =>
    EMPHASISED.includes(part) ? (
      <strong key={i} className="font-medium text-[var(--text)]">
        {part}
      </strong>
    ) : (
      part
    ),
  )
}

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="grid grid-cols-1 border-b border-[var(--border)] md:grid-cols-2"
    >
      <div className="border-b border-[var(--border)] px-5 py-9 sm:px-7 md:border-r md:border-b-0">
        <SectionLabel as="h2" id="about-heading" index="01">
          about_me
        </SectionLabel>
        {personal.bio.map((para) => (
          <p key={para.slice(0, 32)} className="mb-3.5 text-[13px] leading-[1.85] text-[var(--muted)] last:mb-0">
            {emphasise(para)}
          </p>
        ))}
      </div>

      <div className="px-5 py-9 sm:px-7">
        {/* Companion panel to about_me — a heading for structure, but no
            index, so the numbered spine follows the sections themselves. */}
        <SectionLabel as="h2" id="loves-heading">
          what_i_love
        </SectionLabel>
        <ul aria-labelledby="loves-heading" className="flex flex-col gap-3">
          {personal.loves.map((item) => (
            <li key={item} className="flex gap-2.5 text-[12.5px] leading-relaxed text-[var(--muted)]">
              <span aria-hidden="true" className="mt-[3px] text-[10px] text-[var(--purple-l)]">
                ▸
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
