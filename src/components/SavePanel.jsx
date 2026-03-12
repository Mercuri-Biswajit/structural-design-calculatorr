/**
 * SavePanel  — sits at the top of the right results column on every page.
 * SaveToast  — fixed toast notification.
 */
import { useState, useRef, useEffect } from 'react'
import { C, F } from '@styles/tokens'
import './SavePanel.css'

// ── SAVE TOAST ────────────────────────────────────────────────
export function SaveToast({ msg }) {
  if (!msg) return null
  const isError = msg.type === 'error'

  return (
    <div className={`save-toast ${isError ? 'save-toast--error' : 'save-toast--success'}`}>
      <div className="save-toast__icon">
        {isError ? '✕' : '✓'}
      </div>
      <span className="save-toast__text">{msg.text}</span>
    </div>
  )
}

// ── SAVE PANEL ────────────────────────────────────────────────
export function SavePanel({
  moduleLabel,
  moduleIcon,
  accentColor,
  projectName,
  setProjectName,
  existingNames,
  onSave,
  isSaving,
  hasData,
}) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)
  const dropRef = useRef(null)
  const accent = accentColor || C.primary

  const suggestions = existingNames.filter(n =>
    n.toLowerCase().includes(projectName.toLowerCase()) && n !== projectName
  )

  useEffect(() => {
    const handler = e => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="save-panel" style={{ borderTopColor: accent }}>
      {/* Header */}
      <div className="save-panel__header">
        <div className="save-panel__icon" style={{
          background: `${accent}12`,
          border: `1px solid ${accent}25`,
          color: accent,
        }}>
          {moduleIcon}
        </div>
        <div>
          <div className="save-panel__title">Save to Project</div>
          <div className="save-panel__subtitle">{moduleLabel} · inputs + results + checks</div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span className={`save-panel__status ${hasData ? 'save-panel__status--ready' : ''}`}>
            {hasData ? '● READY' : '○ NO DATA'}
          </span>
        </div>
      </div>

      {/* Project name input */}
      <div ref={dropRef} style={{ position: 'relative', marginBottom: 10 }}>
        <label className="ui-label">Project Name</label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={projectName}
            onChange={e => { setProjectName(e.target.value); setShowDropdown(true) }}
            onFocus={() => { setInputFocused(true); setShowDropdown(true) }}
            onBlur={() => setInputFocused(false)}
            placeholder="e.g. G+3 Residential Block A"
            className="ui-input"
            style={{
              paddingRight: 34,
              borderColor: inputFocused ? accent : undefined,
              boxShadow: inputFocused ? `0 0 0 3px ${accent}15` : undefined,
            }}
          />
          <span className="save-panel__input-icon">📁</span>
        </div>

        {/* Dropdown */}
        {showDropdown && suggestions.length > 0 && (
          <div className="save-panel__dropdown">
            <div className="save-panel__dropdown-label">Existing Projects</div>
            {suggestions.slice(0, 6).map(name => (
              <button
                key={name}
                onMouseDown={() => { setProjectName(name); setShowDropdown(false) }}
                className="save-panel__dropdown-item"
              >
                <span style={{ fontSize: 12, opacity: 0.5 }}>📁</span>
                <span style={{ flex: 1 }}>{name}</span>
                <span className="save-panel__dropdown-hint">add module</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Existing project chips */}
      {existingNames.length > 0 && (
        <div className="save-panel__chips">
          {existingNames.slice(0, 4).map(name => (
            <button
              key={name}
              onClick={() => setProjectName(name)}
              className={`save-panel__chip ${projectName === name ? 'save-panel__chip--active' : ''}`}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {/* Save button */}
      <button
        onClick={onSave}
        disabled={isSaving || !hasData}
        className="save-panel__btn"
        style={{
          background: isSaving
            ? C.inkFaint
            : !hasData
            ? C.bgAlt
            : `linear-gradient(135deg, ${accent} 0%, ${accent}dd 100%)`,
          color: !hasData ? C.inkFaint : '#fff',
          cursor: isSaving || !hasData ? 'not-allowed' : 'pointer',
          boxShadow: hasData && !isSaving ? `0 4px 14px ${accent}30` : 'none',
        }}
      >
        {isSaving ? (
          <>
            <span className="save-panel__spinner" />
            Saving…
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2h7.5L12 4.5V12a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
              <rect x="4" y="8" width="6" height="4" rx="0.5" fill="currentColor" opacity="0.5"/>
              <rect x="4" y="2" width="5" height="3" rx="0.5" fill="currentColor" opacity="0.5"/>
            </svg>
            {hasData ? 'Save to Dashboard' : 'Run calculation first'}
          </>
        )}
      </button>
    </div>
  )
}