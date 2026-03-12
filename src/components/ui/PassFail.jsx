import { C, F } from '@styles/tokens'

export function PassFail({ pass, code }) {
  const color = pass ? C.success : C.red
  const bg    = pass ? C.successLight : C.redLight

  return (
    <div className="pass-fail">
      <span className="pass-fail__code">{code}</span>
      <span
        className="pass-fail__badge"
        style={{
          background: bg,
          color:      color,
          border:     `1px solid ${color}25`,
        }}
      >
        {pass ? '✓ PASS' : '✗ FAIL'}
      </span>
    </div>
  )
}
