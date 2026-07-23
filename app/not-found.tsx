import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-mono text-center px-4"
         style={{background:'var(--bg)'}}>
      <p style={{color:'var(--purple-l)'}} className="text-sm mb-2">// 404</p>
      <h1 className="font-syne text-4xl font-bold mb-4">Page not found.</h1>
      <p style={{color:'var(--muted)'}} className="text-sm mb-8">This route doesn't exist in the repo.</p>
      <Link href="/" style={{color:'var(--muted)',borderColor:'var(--border)'}}
            className="text-sm border px-5 py-2 rounded-md hover:text-purple-400 transition-colors">
        cd ~/home →
      </Link>
    </div>
  )
}
