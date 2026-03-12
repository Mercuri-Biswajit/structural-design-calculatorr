import { C } from '@styles/tokens'

export function InfoBox({ color, lightColor, children }) {
  const col = color || C.success
  const bg  = lightColor || C.successLight

  return (
    <div
      className="info-box"
      style={{
        background:  bg,
        border:      `1px solid ${col}20`,
        borderLeft:  `3px solid ${col}`,
      }}
    >
      <div className="info-box__content">
        {children}
      </div>
    </div>
  )
}
