import { C, F } from '@styles/tokens'
import './UtilBar.css'

export function UtilBar({ pct, label, color }) {
  const p = Math.min(Math.max(parseFloat(pct) || 0, 0), 150)
  const col = color || (p <= 70 ? C.success : p <= 100 ? C.yellow : C.red)

  return (
    <div className="util-bar">
      <div className="util-bar__header">
        <span className="util-bar__label">{label}</span>
        <span className="util-bar__pct" style={{ color: col }}>{pct}%</span>
      </div>
      <div className="util-bar__track">
        <div
          className="util-bar__fill"
          style={{
            width: `${Math.min(p, 100)}%`,
            background: `linear-gradient(90deg, ${col}, ${col}cc)`,
            boxShadow: `0 0 8px ${col}30`,
          }}
        />
      </div>
    </div>
  )
}
