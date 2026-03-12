import { C, F } from '@styles/tokens'

export function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="ui-label">
      {children}
    </label>
  )
}
