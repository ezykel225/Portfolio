import { experience, education, certifications } from '@/lib/data'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { TimelineItem } from '@/components/ui/TimelineItem'

const certDotColors: Record<string, string> = {
  green:  'rgba(34,197,94,.1)',
  amber:  'rgba(251,191,36,.1)',
  blue:   'rgba(96,165,250,.1)',
  purple: 'rgba(167,139,250,.1)',
}

export function Experience() {
  return (
    <section id="experience" className="grid grid-cols-1 md:grid-cols-2 border-b" style={{ borderColor: 'var(--border)' }}>
      {/* LEFT — Work experience */}
      <div className="px-7 py-7 border-b md:border-b-0 md:border-r" style={{ borderColor: 'var(--border)' }}>
        <SectionLabel>work_experience</SectionLabel>

        {/* Career snapshot */}
        <div className="rounded-lg p-3.5 mb-6 grid grid-cols-2 gap-2"
             style={{ background: 'rgba(124,58,237,.08)', border: '0.5px solid rgba(124,58,237,.25)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, color: 'var(--purple-l)' }}
               className="col-span-2 mb-1 tracking-wide">// career_snapshot</div>
          {[['7+', 'yrs_working'], ['5', 'roles_held'], ['2019', 'first_job'], ['2027', 'graduating']].map(([v, l]) => (
            <div key={l}>
              <div className="font-syne text-xl font-bold" style={{ color: 'var(--purple-l)' }}>{v}</div>
              <div className="text-[9.5px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted2)' }}>{l}</div>
            </div>
          ))}
        </div>

        {experience.map((job, i) => (
          <TimelineItem key={job.id} item={job} isLast={i === experience.length - 1} />
        ))}
      </div>

      {/* RIGHT — Education + Certs */}
      <div className="px-7 py-7">
        <SectionLabel>education</SectionLabel>
        {education.map((edu) => (
          <div key={edu.id} className="flex gap-4 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0"
                   style={{ background: 'var(--green)', border: '2px solid var(--bg)' }} />
            </div>
            <div>
              <div className="font-syne text-[13px] font-bold">{edu.degree}</div>
              <div className="text-[12px] mt-0.5" style={{ color: 'var(--purple-l)' }}>{edu.school}</div>
              <div className="text-[10px] mt-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted2)' }}>
                {edu.date}
              </div>
              <p className="text-[11.5px] mt-1.5 leading-relaxed" style={{ color: 'var(--muted)' }}>{edu.desc}</p>
            </div>
          </div>
        ))}

        <SectionLabel>certifications</SectionLabel>
        <div className="flex flex-col gap-2">
          {certifications.length === 0 && (
            <p className="text-[11px]" style={{ color: 'var(--muted2)', fontFamily: 'var(--font-mono)' }}>
              // none yet — check back soon
            </p>
          )}
          {certifications.map((cert) => (
            <div key={cert.id} className="flex items-center gap-3 rounded-lg p-3"
                 style={{ background: 'var(--surface)', border: '0.5px solid var(--border)' }}>
              <div className="w-7 h-7 rounded-md flex items-center justify-center text-sm flex-shrink-0"
                   style={{ background: certDotColors[cert.color] }}>✓</div>
              <div>
                <div className="text-[12px] font-semibold">{cert.name}</div>
                <div className="text-[10px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted2)' }}>
                  {cert.issuer} · {cert.year}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transferable skills note */}
        <div className="mt-5 rounded-lg p-3.5" style={{ background: 'var(--surface)', border: '0.5px solid var(--border)' }}>
          <div className="text-[9.5px] mb-2 tracking-wide" style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted2)' }}>
            // transferable_skills
          </div>
          <p className="text-[11.5px] leading-relaxed" style={{ color: 'var(--muted)' }}>
            7+ years of remote work at Remotasks/Outlier means exceptional{' '}
            <span style={{ color: 'var(--text)', fontWeight: 500 }}>discipline, self-management, and attention to detail</span>
            {' '}— skills that directly translate into writing clean, well-documented code.
          </p>
        </div>
      </div>
    </section>
  )
}
