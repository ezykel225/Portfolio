'use client'
import { useState } from 'react'
import { personal } from '@/lib/data'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from '@/components/ui/icons'

// Google Form: https://docs.google.com/forms/d/e/1FAIpQLSdldu_dbuTpwtw_bGVb9RHK5KPuPLaM9vlkjeh70pT2ZwyvBg/viewform
// Entry IDs pulled from the pre-filled link (order: Name, Email, Message).
const GOOGLE_FORM_ACTION_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdldu_dbuTpwtw_bGVb9RHK5KPuPLaM9vlkjeh70pT2ZwyvBg/formResponse'
const ENTRY_NAME = 'entry.845350007'
const ENTRY_EMAIL = 'entry.655136384'
const ENTRY_MESSAGE = 'entry.1452645591'

/** Strips the scheme and any trailing slash so links read as handles. */
function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

const inputClass =
  'w-full rounded-md border-[0.5px] border-[var(--border)] bg-[var(--bg)] px-3 py-2.5 font-dm text-[13px] text-[var(--text)] ' +
  'placeholder:text-[var(--muted2)] focus:border-[var(--purple-l)] focus:outline-none'

const labelClass = 'mb-1.5 block font-mono text-[10.5px] tracking-wide text-[var(--muted2)]'

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    const body = new FormData()
    body.append(ENTRY_NAME, form.name)
    body.append(ENTRY_EMAIL, form.email)
    body.append(ENTRY_MESSAGE, form.message)

    try {
      // Google Forms doesn't return CORS headers, so the browser blocks us
      // from reading the response with a normal fetch. 'no-cors' still lets
      // the POST go through and Google records it — we just can't inspect
      // the result in code, which is expected and fine for this use case.
      await fetch(GOOGLE_FORM_ACTION_URL, { method: 'POST', mode: 'no-cors', body })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const contactMethods = [
    { Icon: MailIcon, label: personal.email, href: `mailto:${personal.email}`, external: false },
    { Icon: LinkedInIcon, label: displayUrl(personal.linkedin), href: personal.linkedin, external: true },
    { Icon: GitHubIcon, label: displayUrl(personal.github), href: personal.github, external: true },
  ]

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="grid grid-cols-1 border-b border-[var(--border)] md:grid-cols-2"
    >
      {/* Left — direct contact routes */}
      <div className="border-b border-[var(--border)] px-5 py-9 sm:px-7 md:border-r md:border-b-0">
        <SectionLabel as="h2" id="contact-heading" index="06">
          get_in_touch
        </SectionLabel>
        <p className="mb-2 font-syne text-2xl font-extrabold tracking-tight">Let&apos;s work together.</p>
        <p className="mb-6 max-w-md text-[13px] leading-relaxed text-[var(--muted)]">
          {personal.availableText}. If you&apos;re hiring a junior developer or have a project you want built, the
          fastest way to reach me is email — I reply to every message.
        </p>

        {/* Email is the primary route, so it gets a real button rather than
            being one row in a list of links. */}
        <Button variant="primary" href={`mailto:${personal.email}`} className="mb-6 w-full sm:w-auto">
          <MailIcon className="h-4 w-4" />
          Email me
        </Button>

        <ul className="flex flex-col gap-1">
          {contactMethods.map(({ Icon, label, href, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="-mx-2 flex min-h-11 items-center gap-3 rounded-md px-2 text-[12.5px] text-[var(--muted)] transition-colors hover:text-[var(--purple-l)]"
              >
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border-[0.5px] border-[var(--border)] bg-[var(--surface2)]"
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                {label}
                {external && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            </li>
          ))}
          {/* Location is information, not a destination — it used to be an
              <a href="#"> that opened a blank tab. */}
          <li className="-mx-2 flex min-h-11 items-center gap-3 px-2 text-[12.5px] text-[var(--muted)]">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border-[0.5px] border-[var(--border)] bg-[var(--surface2)]"
            >
              <PinIcon className="h-3.5 w-3.5" />
            </span>
            {personal.location} · open to remote
          </li>
        </ul>
      </div>

      {/* Right — message form */}
      <div className="px-5 py-9 sm:px-7" style={{ background: 'var(--surface)' }}>
        <SectionLabel as="h2" id="message-heading">
          send_message
        </SectionLabel>

        {/* Status is announced to screen readers as it changes. */}
        <div aria-live="polite">
          {status === 'sent' && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div aria-hidden="true" className="mb-3 text-4xl text-[var(--green)]">
                ✓
              </div>
              <p className="font-syne font-bold text-[var(--green)]">Message sent.</p>
              <p className="mt-1 text-[12.5px] text-[var(--muted)]">Thanks — I&apos;ll get back to you soon.</p>
              <button
                type="button"
                onClick={() => {
                  setForm({ name: '', email: '', message: '' })
                  setStatus('idle')
                }}
                className="mt-4 font-mono text-[11.5px] text-[var(--muted)] underline underline-offset-4 transition-colors hover:text-[var(--purple-l)]"
              >
                Send another message
              </button>
            </div>
          )}
        </div>

        {status !== 'sent' && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                name
              </label>
              <input
                id="contact-name"
                name="name"
                className={inputClass}
                placeholder="Your name"
                autoComplete="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className={labelClass}>
                email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className={inputClass}
                placeholder="your@email.com"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="contact-message" className={labelClass}>
                message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                className={`${inputClass} resize-y`}
                placeholder="Role, project, or just saying hello — what would you like to discuss?"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <div aria-live="assertive">
              {status === 'error' && (
                <p className="text-[11.5px] text-[#FCA5A5]">
                  Something went wrong sending that. Please try again, or email me directly at{' '}
                  <a className="underline underline-offset-2" href={`mailto:${personal.email}`}>
                    {personal.email}
                  </a>
                  .
                </p>
              )}
            </div>

            <Button variant="primary" type="submit" disabled={status === 'submitting'} className="w-full">
              {status === 'submitting' ? 'Sending…' : 'Send message'}
              {status !== 'submitting' && <span aria-hidden="true">→</span>}
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}
