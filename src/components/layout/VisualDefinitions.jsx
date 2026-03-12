import { C } from '@styles/tokens'

/**
 * Global SVG definitions for textures and filters.
 * Mount this at the top of the app to reuse IDs across components.
 */
export default function VisualDefinitions() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
      <defs>
        {/* Realistic Concrete Texture */}
        <pattern id="concrete" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill={C.bgInput} />
          <circle cx="2" cy="5" r="0.8" fill={C.inkFaint} opacity="0.3" />
          <circle cx="20" cy="15" r="1.2" fill={C.inkFaint} opacity="0.2" />
          <circle cx="45" cy="10" r="0.6" fill={C.inkFaint} opacity="0.4" />
          <circle cx="60" cy="35" r="1" fill={C.inkFaint} opacity="0.25" />
          <circle cx="10" cy="50" r="0.8" fill={C.inkFaint} opacity="0.3" />
          <circle cx="35" cy="65" r="0.7" fill={C.inkFaint} opacity="0.2" />
          <circle cx="70" cy="60" r="1.1" fill={C.inkFaint} opacity="0.35" />
          <circle cx="5" cy="75" r="0.5" fill={C.inkFaint} opacity="0.15" />
        </pattern>

        {/* Brushed Steel Texture */}
        <pattern id="steel" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="#f8fafc" />
          <line x1="0" y1="10" x2="100" y2="12" stroke={C.inkFaint} strokeWidth="0.5" opacity="0.1" />
          <line x1="0" y1="30" x2="100" y2="34" stroke={C.inkFaint} strokeWidth="0.5" opacity="0.1" />
          <line x1="0" y1="60" x2="100" y2="62" stroke={C.inkFaint} strokeWidth="0.5" opacity="0.1" />
          <line x1="0" y1="90" x2="100" y2="95" stroke={C.inkFaint} strokeWidth="0.5" opacity="0.1" />
        </pattern>

        {/* Soil Texture */}
        <pattern id="soil" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <rect width="120" height="120" fill={C.bgAlt} />
          <path d="M 0 0 L 120 120 M 60 -60 L 180 60 M -60 60 L 60 180" stroke={C.inkFaint} strokeWidth="0.5" opacity="0.15" />
        </pattern>

        {/* Drop Shadow Filter */}
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.1" />
        </filter>

        {/* Heavy Drop Shadow (for 3D depth) */}
        <filter id="heavy-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="3" dy="6" stdDeviation="6" floodOpacity="0.15" />
        </filter>

        {/* Soft Glow */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  )
}
