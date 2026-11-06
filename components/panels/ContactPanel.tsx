'use client'
import { useState } from 'react'
import { personal } from '@/lib/data'
import { contactRoutes } from '@/lib/workspace'
import { TODO } from '@/lib/data'
import { GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from '@/components/icons'
import { ArrowOutIcon, SendIcon } from '../icons'

// A real, working Google Form inbox. Entry IDs come from the form's
// pre-filled link (order: Name, Email, Message).
const FORM_ACTION =
  'https://docs.google.com/forms/d/e/1FAIpQLSdldu_dbuTpwtw_bGVb9RHK5KPuPLaM9vlkjeh70pT2ZwyvBg/formResponse'
const ENTRY_NAME = 'entry.845350007'
const ENTRY_EMAIL = 'entry.655136384'
const ENTRY_MESSAGE = 'entry.1452645591'

const routeIcon = {
  email: MailIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
} as const

/** Compact card body — the three real routes, e-mail first. */
export function ContactGlance() {
  return (
    // Availability is stated on the positioning card and in the rail,
    // so the card shows only the routes themselves.
    <div className="flex flex-col gap-2">
      <ul className="flex flex-col gap-1.5">
        {contactRoutes.map((route) => {
          const Icon = routeIcon[route.key]
          return (
            <li key={route.key} className="flex items-center gap-2.5 text-[12px] text-[var(--muted)]">
              <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--purple-l)]" />
              <span className="truncate">{route.value}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const inputClass =
  'w-full rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] bg-[var(--bg)] px-3 py-2.5 text-[13px] ' +
  'text-[var(--text)] placeholder:text-[var(--muted2)] focus:border-[var(--purple-l)] focus:outline-none'

const labelClass = 'mb-1.5 block font-mono text-[10.5px] tracking-wider text-[var(--muted2)] uppercase'

export function ContactFull() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')

    const body = new FormData()
    body.append(ENTRY_NAME, form.name)
    body.append(ENTRY_EMAIL, form.email)
    body.append(ENTRY_MESSAGE, form.message)

    try {
      // Google Forms sends no CORS headers, so the response cannot be
      // read from script. 'no-cors' still delivers the POST and Google
      // records the response — we simply cannot inspect the result.
      await fetch(FORM_ACTION, { method: 'POST', mode: 'no-cors', body })
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-[13px] leading-relaxed text-[var(--muted)]">
        {personal.availableText}. E-mail is the fastest way to reach me; the form below lands in the same inbox.
      </p>

      <ul className="flex flex-col gap-2">
        {contactRoutes.map((route) => {
          const Icon = routeIcon[route.key]
          const external = route.href.startsWith('http')
          return (
            <li key={route.key}>
              <a
                href={route.href}
                {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                className="wk-interactive flex min-h-11 items-center gap-3 rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] px-3.5 py-2.5"
              >
                <Icon className="h-4 w-4 shrink-0 text-[var(--purple-l)]" />
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[10px] tracking-wider text-[var(--muted2)] uppercase">
                    {route.label}
                  </span>
                  <span className="block truncate text-[12.5px] text-[var(--text)]">{route.value}</span>
                </span>
                {external ? <ArrowOutIcon className="h-4 w-4 shrink-0 text-[var(--muted2)]" /> : null}
              </a>
            </li>
          )
        })}
      </ul>

      <p className="flex items-center gap-2 text-[12px] text-[var(--muted2)]">
        <PinIcon className="h-3.5 w-3.5 shrink-0" />
        {personal.location}
      </p>

      {/* The practical details someone checks before writing. Any row
          still TODO is left out rather than shown as a placeholder. */}
      <section>
        <h3 className="wk-meta mb-2.5 flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-[3px] rounded-full bg-[var(--green)]" />
          Availability
        </h3>
        <dl className="grid gap-px overflow-hidden rounded-[var(--wk-radius-sm)] border border-[var(--wk-line)] bg-[var(--wk-line)]">
          {[
            { label: 'Open to', value: personal.availability.openTo.join(' · ') },
            { label: 'Available from', value: personal.availability.from },
            { label: 'Timezone', value: personal.availability.timezone },
          ]
            .filter((row) => row.value !== TODO)
            .map((row) => (
              <div key={row.label} className="flex items-baseline gap-3 bg-[var(--wk-card)] px-3.5 py-2.5">
                <dt className="w-28 shrink-0 font-mono text-[10.5px] tracking-wide text-[var(--muted2)] uppercase">
                  {row.label}
                </dt>
                <dd className="text-[12.5px] text-[var(--text)]">{row.value}</dd>
              </div>
            ))}
        </dl>
      </section>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <h3 className="wk-meta flex items-center gap-2">
          <span aria-hidden="true" className="h-2.5 w-[3px] rounded-full bg-[var(--purple-l)]" />
          Send a message
        </h3>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="wk-name">
              Name
            </label>
            <input
              id="wk-name"
              required
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className={inputClass}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="wk-email">
              Email
            </label>
            <input
              id="wk-email"
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className={inputClass}
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="wk-message">
            Message
          </label>
          <textarea
            id="wk-message"
            required
            rows={4}
            value={form.message}
            onChange={(event) => setForm({ ...form, message: event.target.value })}
            className={`${inputClass} resize-y`}
            placeholder="What would you like to build?"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting' || status === 'sent'}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--wk-radius-sm)] bg-[var(--purple)] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <SendIcon className="h-4 w-4" />
          {status === 'submitting' ? 'Sending…' : status === 'sent' ? 'Message sent' : 'Send message'}
        </button>

        {/* Status is announced rather than only shown. */}
        <p role="status" aria-live="polite" className="min-h-4 text-[12px] text-[var(--muted)]">
          {status === 'sent' ? 'Thanks — your message is in. I reply to every one.' : null}
          {status === 'error' ? (
            <span className="text-[var(--amber)]">
              That did not go through. Please e-mail {personal.email} directly.
            </span>
          ) : null}
        </p>
      </form>
    </div>
  )
}
