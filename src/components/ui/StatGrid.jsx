export function StatGrid({ cols = 3, children }) {
  return (
    <div
      className="stat-grid"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {children}
    </div>
  )
}
