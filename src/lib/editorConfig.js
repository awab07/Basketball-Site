export const BALL_COLORS = [
  { name: 'Classic Orange', hex: '#FF5722' },
  { name: 'Midnight Black', hex: '#161616' },
  { name: 'Royal Blue', hex: '#4169E1' },
  { name: 'Championship Red', hex: '#C8102E' },
  { name: 'Forest Green', hex: '#1F4D36' },
  { name: 'Purple', hex: '#5B21B6' },
]

export const PRICING = {
  base: 25,
  text: 5,
  number: 4,
  logo: 8,
  clipart: 3,
  pattern: 2,
}

export function createDefaultDesign() {
  return {
    color: '#FF5722',
    pattern: 'solid',
    text: { value: 'YOUR NAME', color: '#111111', visible: true },
    number: { value: '', color: '#111111', visible: true },
    logo: { dataUrl: null, fileName: '', visible: true },
    clipart: { id: null, color: '#111111', visible: true },
  }
}

export const TEMPLATES = [
  {
    id: 'court-classic',
    name: 'Court Classic',
    design: {
      color: '#FF5722',
      pattern: 'solid',
      text: { value: 'BALLER', color: '#111111', visible: true },
      number: { value: '', color: '#111111', visible: true },
      logo: { dataUrl: null, fileName: '', visible: true },
      clipart: { id: null, color: '#111111', visible: true },
    },
  },
  {
    id: 'blackout-pro',
    name: 'Blackout Pro',
    design: {
      color: '#161616',
      pattern: 'pinstripe',
      text: { value: '', color: '#ffffff', visible: true },
      number: { value: '23', color: '#ffffff', visible: true },
      logo: { dataUrl: null, fileName: '', visible: true },
      clipart: { id: null, color: '#ffffff', visible: true },
    },
  },
  {
    id: 'team-royal',
    name: 'Team Royal',
    design: {
      color: '#4169E1',
      pattern: 'dots',
      text: { value: 'TEAM', color: '#ffffff', visible: true },
      number: { value: '', color: '#ffffff', visible: true },
      logo: { dataUrl: null, fileName: '', visible: true },
      clipart: { id: 'star', color: '#ffffff', visible: true },
    },
  },
  {
    id: 'sunset-splash',
    name: 'Sunset Splash',
    design: {
      color: '#C8102E',
      pattern: 'splatter',
      text: { value: '', color: '#111111', visible: true },
      number: { value: '', color: '#111111', visible: true },
      logo: { dataUrl: null, fileName: '', visible: true },
      clipart: { id: 'flame', color: '#111111', visible: true },
    },
  },
]

export function describeColor(hex) {
  const match = BALL_COLORS.find((c) => c.hex.toLowerCase() === hex?.toLowerCase())
  return match ? match.name : 'Custom color'
}

export function describeDesign(design) {
  const nameNumber = [
    design.text?.visible && design.text.value.trim(),
    design.number?.visible && design.number.value.trim(),
  ]
    .filter(Boolean)
    .join(' ')
  const hasLogo = Boolean(design.logo?.visible && design.logo.dataUrl)

  return {
    colorName: describeColor(design.color),
    label: nameNumber || 'Plain ball',
    hasLogo,
    printSides: hasLogo ? 'Front and back printed' : 'Front printed',
  }
}

export function computePrice(design, qty = 1) {
  const lines = [{ label: 'Base ball', amount: PRICING.base }]
  if (design.text.visible && design.text.value.trim()) {
    lines.push({ label: 'Custom text', amount: PRICING.text })
  }
  if (design.number.visible && design.number.value.trim()) {
    lines.push({ label: 'Custom number', amount: PRICING.number })
  }
  if (design.logo.visible && design.logo.dataUrl) {
    lines.push({ label: 'Logo print', amount: PRICING.logo })
  }
  if (design.clipart.visible && design.clipart.id) {
    lines.push({ label: 'Clipart', amount: PRICING.clipart })
  }
  if (design.pattern !== 'solid') {
    lines.push({ label: 'Pattern finish', amount: PRICING.pattern })
  }
  const unit = lines.reduce((sum, line) => sum + line.amount, 0)
  return { lines, unit, total: unit * qty }
}
