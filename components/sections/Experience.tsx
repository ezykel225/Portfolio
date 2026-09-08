import { experience, education, certifications, careerSnapshot, experienceThemes } from '@/lib/data'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { TimelineItem } from '@/components/ui/TimelineItem'

const certDotColors: Record<string, string> = {
  green: 'rgba(34,197,94,.1)',
  amber: 'rgba(251,191,36,.1)',
  blue: 'rgba(96,165,250,.1)',
  purple: 'rgba(167,139,250,.1)',
}

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="grid grid-cols-1 border-b border-[var(--border)] md:grid-cols-2"
    >
      {/* LEFT — Work experience */}
      <div className="border-b border-[var(--border)] px-5 py-9 sm:px-7 md:border-r md:border-b-0">
        <SectionLabel as="h2" id="experience-heading" index="04">
          work_experience
        </SectionLabel>

        {/* Career snapshot — every figure computed in lib/data.ts */}
        <div
          className="mb-6 grid grid-cols-2 gap-3 rounded-lg p-4"
          style={{ background: 'rgba(124,58,237,.08)', border: '0.5px solid rgba(124,58,237,.25)' }}
        >
          <p className="col-span-2 mb-1 font-mono text-[9.5px] tracking-wide text-[var(--purple-l)]">
            <span aria-hidden="true">{'// '}</span>career_snapshot
          </p>
          {careerSnapshot.map((s) => (
            <div key={s.label}>
              <div className="font-syne text-xl font-bold text-[var(--purple-l)]">{s.value}</div>
              <div className="font-mono text-[9.5px] text-[var(--muted2)]">{s.label}</div>
            </div>
          ))}
        </div>

        <ol className="list-none">
          {experience.map((job, i) => (
            <TimelineItem key={job.id} item={job} isLast={i === experience.length - 1} />
          ))}
        </ol>
      </div>

      {/* RIGHT — Education, certs, and what the non-dev work contributes */}
      <div className="px-5 py-9 sm:px-7">
        <SectionLabel as="h2" id="education-heading">
          education
        </SectionLabel>
        {education.map((edu) => (
          <div key={edu.id} className="mb-7 flex gap-4">
            <div className="flex flex-col items-center" aria-hidden="true">
              <div
                className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full"
                style={{ background: 'var(--green)', border: '2px solid var(--bg)' }}
              />
            </div>
            <div>
              <h3 className="font-syne text-[13.5px] font-bold">{edu.degree}</h3>
              <div className="mt-0.5 text-[12px] text-[var(--purple-l)]">{edu.school}</div>
              <div className="mt-1 font-mono text-[10px] text-[var(--muted2)]">{edu.date}</div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-[var(--muted)]">{edu.desc}</p>
            </div>
          </div>
        ))}

        {/* What the non-development roles actually contribute. Each point
            names the role behind it rather than asserting a soft skill. */}
        <SectionLabel as="h2" id="brings-heading">
          what_this_background_brings
        </SectionLabel>
        <ul aria-labelledby="brings-heading" className="mb-7 flex flex-col gap-3">
          {experienceThemes.map((theme) => (
            <li key={theme.title} className="panel rounded-lg p-3.5">
              <h3 className="font-syne text-[12.5px] font-bold">{theme.title}</h3>
              <p className="mt-1 text-[11.5px] leading-relaxed text-[var(--muted)]">{theme.body}</p>
            </li>
          ))}
        </ul>

        <SectionLabel as="h2" id="certs-heading">
          certifications
        </SectionLabel>
        <div className="flex flex-col gap-2">
          {certifications.length === 0 && (
            <p className="font-mono text-[11px] text-[var(--muted2)]">
              <span aria-hidden="true">{'// '}</span>none yet — working on it
            </p>
          )}
          {certifications.map((cert) => (
            <div key={cert.id} className="panel flex items-center gap-3 rounded-lg p-3">
              <div
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-sm"
                style={{ background: certDotColors[cert.color] }}
                aria-hidden="true"
              >
                ✓
              </div>
              <div>
                <div className="text-[12px] font-semibold">{cert.name}</div>
                <div className="font-mono text-[10px] text-[var(--muted2)]">
                  {cert.issuer} · {cert.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
