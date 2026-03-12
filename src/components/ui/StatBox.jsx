import './StatBox.css'

export function StatBox({ label, value, unit, color }) {
  return (
    <div className="stat-box">
      <div className="stat-box__label">{label}</div>
      <div className="stat-box__value" style={{ color: color || 'var(--success)' }}>
        {value}
      </div>
      {unit && <div className="stat-box__unit">{unit}</div>}
    </div>
  )
}
