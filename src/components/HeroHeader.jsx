import { useLocation } from 'react-router-dom'
import { C, F } from '@styles/tokens'
import { ROUTES } from '@routes/index'

export default function HeroHeader() {
  const { pathname } = useLocation()
  const route = ROUTES.find(r => r.path === pathname)

  if (!route || route.id === 'dashboard') return null

  return (
    <div className="glass-card" style={{
      borderRadius: 14,
      padding: '16px 20px',
      marginBottom: 16,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* Icon */}
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: `${route.color}12`,
          border: `1.5px solid ${route.color}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: route.color, flexShrink: 0,
        }}>
          {route.icon}
        </div>

        {/* Title + description */}
        <div>
          <h1 style={{
            margin: 0, fontSize: 20, fontWeight: 800,
            color: C.ink, letterSpacing: '-0.3px',
            fontFamily: F.sans, lineHeight: 1.2,
          }}>
            {route.fullLabel}
          </h1>
          <p style={{
            margin: '2px 0 0', fontSize: 11.5,
            color: C.inkLight, fontFamily: F.mono,
          }}>
            {route.description}
          </p>
        </div>
      </div>

      {/* Code badges */}
      {route.codes.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {route.codes.map(code => (
            <span key={code} style={{
              padding: '3px 10px', borderRadius: 6,
              background: `${route.color}10`,
              border: `1px solid ${route.color}22`,
              color: route.color,
              fontSize: 10.5, fontFamily: F.mono, fontWeight: 700, letterSpacing: '0.5px',
            }}>{code}</span>
          ))}
        </div>
      )}
    </div>
  )
}