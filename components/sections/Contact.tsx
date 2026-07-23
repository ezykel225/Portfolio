'use client'
import { useState } from 'react'
import { personal } from '@/lib/data'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

// Google Form: https://docs.google.com/forms/d/e/1FAIpQLSdldu_dbuTpwtw_bGVb9RHK5KPuPLaM9vlkjeh70pT2ZwyvBg/viewform
// Entry IDs pulled from the pre-filled link (order: Name, Email, Message).
const GOOGLE_FORM_ACTION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdldu_dbuTpwtw_bGVb9RHK5KPuPLaM9vlkjeh70pT2ZwyvBg/formResponse'
const ENTRY_NAME = 'entry.845350007'
const ENTRY_EMAIL = 'entry.655136384'
const ENTRY_MESSAGE = 'entry.1452645591'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(false)

    const body = new FormData()
    body.append(ENTRY_NAME, form.name)
    body.append(ENTRY_EMAIL, form.email)
    body.append(ENTRY_MESSAGE, form.message)

    try {
      // Google Forms doesn't return CORS headers, so the browser blocks us
      // from reading the response with a normal fetch. 'no-cors' still lets
      // the POST go through and Google records it — we just can't inspect
      // the result in code, which is expected and fine for this use case.
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body,
      })
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    background: 'var(--bg)',
    border: '0.5px solid var(--border)',
    borderRadius: 6,
    padding: '9px 12px',
    fontSize: 12,
    color: 'var(--text)',
    width: '100%',
    fontFamily: 'var(--font-dm)',
    outline: 'none',
  }

  return (
    <section id="contact" className="grid grid-cols-1 md:grid-cols-2 border-b" style={{ borderColor: 'var(--border)' }}>
      {/* Left */}
      <div className="px-7 py-7 border-b md:border-b-0 md:border-r" style={{ borderColor: 'var(--border)' }}>
        <SectionLabel>get_in_touch</SectionLabel>
        <h2 className="font-syne text-2xl font-extrabold tracking-tight mb-2">Let's work together.</h2>
        <p className="text-[13px] leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
          Open to internships, junior developer roles, freelance projects, and collaboration. If you have an interesting problem to solve, I want to hear about it.
        </p>
        <div className="flex flex-col gap-3">
          {[
            { icon: '✉', label: personal.email, href: `mailto:${personal.email}` },
            { icon: 'in', label: 'linkedin.com/in/ezequel', href: personal.linkedin },
            { icon: '⎇',  label: 'github.com/ezequel', href: personal.github },
            { icon: '📍', label: `${personal.location} · Open to Remote`, href: '#' },
          ].map(({ icon, label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-3 text-[12.5px] transition-colors hover:text-purple-400"
               style={{ color: 'var(--muted)' }}>
              <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                    style={{ background: 'var(--surface2)', border: '0.5px solid var(--border)' }}>{icon}</span>
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Right — Form */}
      <div className="px-7 py-7" style={{ background: 'var(--surface)' }}>
        <SectionLabel>send_message</SectionLabel>
        {sent ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <div className="text-4xl mb-3">✓</div>
            <p style={{ color: 'var(--green)' }} className="font-syne font-bold">Message sent!</p>
            <p className="text-[12px] mt-1" style={{ color: 'var(--muted)' }}>I'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="block text-[10px] mb-1.5 tracking-wide" style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted2)' }}>name</label>
              <input style={inputStyle} name="name" placeholder="Your name" required
                     value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-[10px] mb-1.5 tracking-wide" style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted2)' }}>email</label>
              <input style={inputStyle} type="email" name="email" placeholder="your@email.com" required
                     value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-[10px] mb-1.5 tracking-wide" style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted2)' }}>message</label>
              <textarea style={{ ...inputStyle, resize: 'none', height: 80 }} name="message"
                        placeholder="What would you like to discuss?" required
                        value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            {error && (
              <p className="text-[11px]" style={{ color: '#F87171' }}>
                Something went wrong — please try again or email me directly.
              </p>
            )}
            <Button variant="primary" type="submit" disabled={submitting} className="w-full justify-center mt-1">
              {submitting ? 'Sending…' : 'Send Message →'}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
