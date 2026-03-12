export function TwoCol({ left, right, leftWidth = '380px' }) {
  return (
    <div className="two-col" style={{ gridTemplateColumns: `${leftWidth} 1fr` }}>
      <div className="anim-slideRight stagger" style={{ minWidth: 0 }}>
        {left}
      </div>
      <div className="anim-fadeUp" style={{ minWidth: 0 }}>
        {right}
      </div>
    </div>
  )
}
