import { personal } from '@/lib/data'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function About() {
  return (
    <section id="about" className="grid grid-cols-1 md:grid-cols-2 border-b" style={{ borderColor: 'var(--border)' }}>
      <div className="px-7 py-7 border-b md:border-b-0 md:border-r" style={{ borderColor: 'var(--border)' }}>
        <SectionLabel>about_me</SectionLabel>
        {personal.bio.map((para, i) => (
          <p key={i} className="text-[13px] leading-[1.8] mb-3 last:mb-0" style={{ color: 'var(--muted)' }}
             dangerouslySetInnerHTML={{ __html: para.replace(/Ezequel|Dumaguete, Central Visayas, Philippines|Asian College of Science and Technology|ECE Contact Centers|Inspiro\/Infocom|Remotasks PH|Outlier AI|Qualfon Dumaguete/g, (m) => `<strong style="color:var(--text);font-weight:500">${m}</strong>`) }}
          />
        ))}
      </div>
      <div className="px-7 py-7">
        <SectionLabel>what_i_love</SectionLabel>
        <ul className="flex flex-col gap-2.5">
          {personal.loves.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[12px] leading-relaxed" style={{ color: 'var(--muted)' }}>
              <span style={{ color: 'var(--purple-l)', fontSize: 10, marginTop: 3 }}>▸</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
