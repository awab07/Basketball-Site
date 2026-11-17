function BasketballPreview({
  panelColor = '#ff6b2c',
  lineColor = '#1a1a1a',
  label = '',
  className = '',
}) {
  const trimmedLabel = label.trim()

  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      role="img"
      aria-label="Basketball preview"
    >
      <circle cx="120" cy="120" r="112" fill={panelColor} />
      <path
        d="M120 8 A112 112 0 0 1 120 232 A112 112 0 0 1 120 8"
        fill="none"
        stroke={lineColor}
        strokeWidth="4"
      />
      <path
        d="M8 120 Q120 60 232 120 Q120 180 8 120 Z"
        fill="none"
        stroke={lineColor}
        strokeWidth="4"
      />
      <path d="M8 120 Q120 180 232 120" fill="none" stroke={lineColor} strokeWidth="4" />
      <line x1="120" y1="8" x2="120" y2="232" stroke={lineColor} strokeWidth="4" />
      <path d="M30 55 Q120 120 30 185" fill="none" stroke={lineColor} strokeWidth="4" />
      <path d="M210 55 Q120 120 210 185" fill="none" stroke={lineColor} strokeWidth="4" />
      <ellipse cx="88" cy="78" rx="26" ry="14" fill="#fff" opacity="0.14" />
      {trimmedLabel && (
        // Matches the 3D stamp: vertical, black, shadow/highlight/fill
        // layered for the same debossed "engraved" style on this fallback,
        // offset off the center seam (x=120) onto the panel to its right.
        <g
          transform="rotate(90 168 128)"
          textAnchor="middle"
          fontWeight="700"
          letterSpacing="1"
          fontSize="27"
        >
          <text x="166.5" y="129.5" fill="#000000">
            {trimmedLabel.toUpperCase()}
          </text>
          <text x="169.5" y="126.5" fill="#45433f">
            {trimmedLabel.toUpperCase()}
          </text>
          <text x="168" y="128" fill="#0a0a0a">
            {trimmedLabel.toUpperCase()}
          </text>
        </g>
      )}
    </svg>
  )
}

export default BasketballPreview
