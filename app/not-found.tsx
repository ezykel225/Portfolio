import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center font-mono">
      <p className="mb-2 text-sm text-[var(--purple-l)]">
        <span aria-hidden="true">{'// '}</span>404
      </p>
      <h1 className="mb-4 font-syne text-4xl font-bold">Page not found.</h1>
      <p className="mb-8 text-sm text-[var(--muted)]">This route doesn&apos;t exist in the repo.</p>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center rounded-md border border-[var(--border)] px-5 py-2 text-sm text-[var(--muted)] transition-colors hover:border-[var(--purple-l)] hover:text-[var(--purple-l)]"
      >
        cd ~/home <span aria-hidden="true">&nbsp;→</span>
      </Link>
    </main>
  )
}
