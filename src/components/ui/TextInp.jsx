import { Label } from './Label'
import './Inp.css'

export function TextInp({ label, value, onChange, placeholder }) {
  return (
    <div className="ui-input-wrap">
      {label && <Label>{label}</Label>}
      <input
        className="ui-input"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
