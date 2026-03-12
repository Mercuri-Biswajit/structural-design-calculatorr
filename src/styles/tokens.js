// ── PREMIUM LIGHT PALETTE ─────────────────────────────────────
export const C = {
  // Surfaces — crisp whites with blue undertones
  bg:       '#f0f4f8',
  bgCard:   '#ffffff',
  bgAlt:    '#e8eef6',
  bgInput:  '#f4f7fb',
  bgHover:  '#eaf0f8',
  bgDark:   '#0f172a',

  // Glassmorphism
  glassBg:     'rgba(255,255,255,0.65)',
  glassBorder: 'rgba(255,255,255,0.45)',
  glassBlur:   'blur(18px)',

  // Borders — subtle blue tint
  border:    '#d4dce8',
  borderMid: '#bcc8d8',
  borderFocus:'#2563eb',

  // Ink — refined hierarchy
  ink:       '#0f172a',
  inkMid:    '#334155',
  inkLight:  '#64748b',
  inkFaint:  '#94a3b8',

  // Primary — electric blue
  primary:       '#2563eb',
  primaryDark:   '#1d4ed8',
  primaryLight:  '#eff6ff',
  primaryGlow:   'rgba(37,99,235,0.12)',
  primaryBright: '#3b82f6',

  // Accent — vivid orange
  accent:       '#ea580c',
  accentDark:   '#c2410c',
  accentLight:  '#fff7ed',
  accentGlow:   'rgba(234,88,12,0.12)',
  accentBright: '#f97316',

  // Success — emerald
  success:      '#059669',
  successDark:  '#047857',
  successLight: '#ecfdf5',
  successMid:   '#d1fae5',
  successGlow:  'rgba(5,150,105,0.12)',

  // Semantic
  blue:         '#2563eb',
  blueLight:    '#eff6ff',
  red:          '#dc2626',
  redLight:     '#fef2f2',
  yellow:       '#d97706',
  yellowLight:  '#fffbeb',
  purple:       '#7c3aed',
  purpleLight:  '#f5f3ff',
  teal:         '#0891b2',
  tealLight:    '#ecfeff',
  green:        '#059669',
  greenLight:   '#ecfdf5',
  greenMid:     '#d1fae5',
  greenGlow:    'rgba(5,150,105,0.12)',
  orange:       '#ea580c',
  orangeLight:  '#fff7ed',
  orangeGlow:   'rgba(234,88,12,0.12)',

  // Legacy aliases (backward compat)
  navy:        '#0f172a',
  navyMid:     '#1e3a5f',
  navyLight:   '#eff6ff',
  navyGlow:    'rgba(15,45,92,0.10)',
  navyBright:  '#2563eb',

  // Elevation — colored tint shadows
  shadowXs: '0 1px 2px rgba(15,23,42,0.04), 0 1px 3px rgba(15,23,42,0.06)',
  shadow:   '0 1px 3px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.06)',
  shadowMd: '0 4px 6px rgba(15,23,42,0.04), 0 10px 24px rgba(15,23,42,0.08)',
  shadowLg: '0 8px 16px rgba(15,23,42,0.06), 0 20px 48px rgba(15,23,42,0.10)',
  shadowGlow: (color) => `0 0 20px ${color}20, 0 4px 12px ${color}15`,
}

// ── TYPOGRAPHY ─────────────────────────────────────────────────
export const F = {
  sans:    "'Outfit', 'Inter', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  mono:    "'JetBrains Mono', 'DM Mono', 'Fira Code', monospace",
  display: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
}

// ── SPACING ────────────────────────────────────────────────────
export const S = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
}

// ── RADIUS ─────────────────────────────────────────────────────
export const R = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  full: 9999,
}

// ── REUSABLE STYLE PRESETS ─────────────────────────────────────
export const badge = (color, bg) => ({
  display:       'inline-flex',
  alignItems:    'center',
  background:    bg,
  color,
  fontFamily:    F.mono,
  fontSize:      11,
  padding:       '2px 8px',
  borderRadius:  R.sm,
  fontWeight:    600,
  letterSpacing: '0.5px',
})