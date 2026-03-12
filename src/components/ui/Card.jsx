import { C } from '@styles/tokens'
import './Card.css'

export function Card({ children, style: extra, accentColor }) {
  return (
    <div
      className="ui-card"
      style={{
        ...(accentColor ? { borderLeft: `3px solid ${accentColor}` } : {}),
        ...extra,
      }}
    >
      {children}
    </div>
  )
}
