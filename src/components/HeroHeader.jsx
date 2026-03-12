import { useLocation } from 'react-router-dom'
import { C, F } from '@styles/tokens'
import { ROUTES } from '@routes/index'

export default function HeroHeader() {
  const { pathname } = useLocation()
  const route = ROUTES.find(r => r.path === pathname)

  if (!route || route.id === 'dashboard') return null

  return (
    <div className="glass-card" style={{
      borderRadius: 12,
      padding: '18px 24px',
      marginBottom: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      border: '1px solid rgba(255, 255, 255, 0.8)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
      background: 'rgba(255, 255, 255, 0.85)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Icon */}
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: `linear-gradient(135deg, ${route.color}15, ${route.color}05)`,
          border: `1px solid ${route.color}20`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, color: route.color, flexShrink: 0,
          boxShadow: `0 4px 12px ${route.color}10`
        }}>
          {route.icon}
        </div>

        {/* Title + description */}
        <div>
          <h1 style={{
            margin: 0, fontSize: 22, fontWeight: 700,
            color: C.ink, letterSpacing: '-0.4px',
            fontFamily: F.sans, lineHeight: 1.2,
          }}>
            {route.fullLabel}
          </h1>
          <p style={{
            margin: '4px 0 0', fontSize: 12,
            color: C.inkLight, fontFamily: F.sans,
            fontWeight: 500
          }}>
            {route.description}
          </p>
        </div>
      </div>

      {/* Code badges */}
      {route.codes.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {route.codes.map(code => (
            <span key={code} style={{
              padding: '4px 12px', borderRadius: 8,
              background: `var(--bg-alt)`,
              border: `1px solid var(--border)`,
              color: 'var(--ink-mid)',
              fontSize: 11, fontFamily: F.mono, fontWeight: 600, letterSpacing: '0.5px',
            }}>{code}</span>
          ))}
        </div>
      )}
    </div>
  )
}