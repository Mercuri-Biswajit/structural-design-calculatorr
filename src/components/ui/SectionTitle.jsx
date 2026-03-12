export function SectionTitle({ children, style: extra }) {
  return (
    <h3 className="section-title" style={extra}>
      {children}
    </h3>
  )
}
