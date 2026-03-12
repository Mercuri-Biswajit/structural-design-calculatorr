import { C, F } from '@styles/tokens'
import './TabBtn.css'

export function TabBtn({ active, onClick, children, color }) {
  const col = color || C.success

  return (
    <button
      onClick={onClick}
      className={`tab-btn ${active ? 'tab-btn--active' : ''}`}
      style={{
        '--tab-color': col,
        borderColor: active ? col : 'var(--border)',
        color: active ? col : 'var(--ink-light)',
        boxShadow: active ? `0 2px 8px ${col}18` : 'none',
      }}
    >
      {children}
    </button>
  )
}
