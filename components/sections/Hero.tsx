'use client'
import { useEffect, useRef } from 'react'
import { personal } from '@/lib/data'
import { Button } from '@/components/ui/Button'

export function Hero() {
  const cursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let i = 0
    const lines = personal.terminalLines
    // Cursor blink is handled by CSS animation
  }, [])

  return (
    <section id="hero" className="px-7 pt-12 pb-10 border-b" style={{ borderColor: 'var(--border)' }}>
      {/* Terminal block */}
      <div
        className="rounded-xl p-4 mb-7 text-[11.5px] leading-7 overflow-x-auto"
        style={{ background: 'var(--surface)', border: '0.5px solid var(--border)', fontFamily: 'var(--font-mono)' }}
      >
        <div className="flex gap-1.5 mb-3">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="ml-2 text-[10px]" style={{ color: 'var(--muted2)' }}>ezequel@portfolio ~ zsh</span>
        </div>
        {personal.terminalLines.map((line, i) => (
          <div key={i}>
            <div className="flex gap-2">
              <span style={{ color: 'var(--purple-l)' }}>❯</span>
              <span style={{ color: 'var(--text)' }}>{line.prompt}</span>
            </div>
            <div className="ml-4" style={{ color: 'var(--green)' }}>{line.output}</div>
          </div>
        ))}
        <div className="flex gap-2 mt-1">
          <span style={{ color: 'var(--purple-l)' }}>❯</span>
          <span
            ref={cursorRef}
            className="inline-block w-2 h-3.5 animate-blink"
            style={{ background: 'var(--purple-l)', verticalAlign: 'middle' }}
          />
        </div>
      </div>

      {/* Heading */}
      <h1 className="font-syne text-[42px] font-extrabold leading-[1.05] tracking-[-2px] mb-3">
        Hi, I&apos;m <span style={{ color: 'var(--purple-l)' }}>Ezequel</span>.<br />
        <span style={{ color: 'var(--muted)' }}>I build for</span> the web.
      </h1>

      <p className="text-[14px] leading-relaxed max-w-lg mb-6" style={{ color: 'var(--muted)' }}>
        <strong style={{ color: 'var(--text)', fontWeight: 500 }}>4th year BSIT student</strong> at Asian College of Science and Technology, graduating 2027. Experienced in IT support, data annotation, and customer service — building web and mobile projects on the side.
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6" style={{ fontFamily: 'var(--font-mono)' }}>
        {[
          { label: '● Open to Part-Time & Freelance Work', c: 'green' },
          { label: 'React · React Native · TypeScript', c: 'purple' },
          { label: 'Supabase · Expo', c: 'blue' },
          { label: 'Dumaguete, PH · Open to Remote', c: 'amber' },
        ].map(({ label, c }) => {
          const styles: Record<string, React.CSSProperties> = {
            green:  { color: 'var(--green)',  border: '0.5px solid rgba(34,197,94,.25)',   background: 'rgba(34,197,94,.07)' },
            purple: { color: 'var(--purple-l)', border: '0.5px solid rgba(167,139,250,.25)', background: 'rgba(167,139,250,.07)' },
            blue:   { color: 'var(--blue)',   border: '0.5px solid rgba(96,165,250,.25)',  background: 'rgba(96,165,250,.07)' },
            amber:  { color: 'var(--amber)',  border: '0.5px solid rgba(251,191,36,.25)',  background: 'rgba(251,191,36,.07)' },
          }
          return (
            <span key={label} className="text-[10.5px] px-2.5 py-1 rounded-md" style={styles[c]}>
              {label}
            </span>
          )
        })}
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-2.5">
        <Button variant="primary" href="#projects">View Projects →</Button>
        <Button variant="ghost" href={personal.resumeUrl}>Download CV</Button>
        <Button variant="outline" href={personal.github}>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </Button>
      </div>
    </section>
  )
}
