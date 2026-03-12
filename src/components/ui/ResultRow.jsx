import { C, F } from '@styles/tokens'

export function ResultRow({ label, value, unit, highlight }) {
  return (
    <div className="result-row">
      <span className="result-row__label">{label}</span>
      <span
        className="result-row__value"
        style={{
          fontWeight: highlight ? 700 : 600,
          color: highlight ? 'var(--success)' : 'var(--ink)',
        }}
      >
        {value}
        {unit && <span className="result-row__unit">{unit}</span>}
      </span>
    </div>
  )
}
