import { Label } from './Label'
import './Inp.css'

export function Inp({ label, value, onChange, type = 'number', options, min, max, step, small, id }) {
  const inputId = id || (label ? label.replace(/\W+/g, '-').toLowerCase() : undefined)
  const sizeClass = small ? 'ui-input--sm' : ''

  return (
    <div className="ui-input-wrap">
      {label && <Label htmlFor={inputId}>{label}</Label>}
      {options ? (
        <select
          id={inputId}
          className={`ui-input ui-select ${sizeClass}`}
          value={value}
          onChange={e => onChange(e.target.value)}
        >
          {options.map(o => (
            <option key={o.v ?? o} value={o.v ?? o}>{o.l ?? o}</option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          className={`ui-input ${sizeClass}`}
          type={type}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={e => onChange(type === 'number' ? (parseFloat(e.target.value) || 0) : e.target.value)}
        />
      )}
    </div>
  )
}
