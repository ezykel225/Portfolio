import { ImageResponse } from 'next/og'
import { personal, projects } from '@/lib/data'
import { monogram } from '@/lib/workspace'

export const alt = `${personal.name} — ${personal.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * The social preview card, generated at build time from lib/data.ts.
 *
 * It is generated rather than shipped as a PNG so it cannot drift: the
 * name, role, location and project titles below are the same values the
 * page renders, and the palette is the same brand palette. The previous
 * portfolio shipped a hand-made image, which went stale the moment the
 * site was redesigned and still advertised a domain that did not exist.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#09090B',
          padding: 64,
          color: '#FAFAFA',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 72,
              height: 72,
              borderRadius: 16,
              border: '1px solid #4C2E8E',
              background: 'rgba(124, 58, 237, 0.14)',
              color: '#A78BFA',
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            {monogram}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 30, fontWeight: 700 }}>{personal.name}</div>
            {/* One child, not three: satori requires an explicit
                display:flex on any element with more than one. */}
            <div style={{ fontSize: 21, color: '#8B8B96', marginTop: 4 }}>
              {`${personal.role} · ${personal.locationShort}`}
            </div>
          </div>
        </div>

        {/* Positioning */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5 }}>
            I build things that have to actually work.
          </div>
          <div style={{ fontSize: 24, color: '#8B8B96', lineHeight: 1.4, maxWidth: 940 }}>
            {personal.summary}
          </div>
        </div>

        {/* The projects, named — the strongest thing on the card */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                display: 'flex',
                borderRadius: 10,
                border: '1px solid #27272A',
                background: '#111113',
                padding: '12px 18px',
                fontSize: 20,
                color: '#FAFAFA',
              }}
            >
              {project.title}
            </div>
          ))}
          <div
            style={{
              display: 'flex',
              marginLeft: 'auto',
              alignItems: 'center',
              gap: 10,
              fontSize: 20,
              color: '#22C55E',
            }}
          >
            <div style={{ display: 'flex', width: 10, height: 10, borderRadius: 5, background: '#22C55E' }} />
            {personal.seeking}
          </div>
        </div>
      </div>
    ),
    size
  )
}
