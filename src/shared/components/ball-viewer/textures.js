import * as THREE from 'three'

function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

// amount < 0 darkens toward black, amount > 0 lightens toward white.
function shade(hex, amount) {
  const { r, g, b } = hexToRgb(hex)
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)))
  const mix = (c) => clamp(amount < 0 ? c * (1 + amount) : c + (255 - c) * amount)
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`
}

// Small deterministic PRNG so a given (pattern, hex) always draws the same
// speckle layout instead of reshuffling on every re-render.
function makeRng(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export const PATTERNS = [
  { id: 'solid', label: 'Solid' },
  { id: 'pinstripe', label: 'Pinstripe' },
  { id: 'dots', label: 'Dots' },
  { id: 'splatter', label: 'Splatter' },
]

// Returns a tiling CanvasTexture for the panel's base material, tinted off
// the selected ball color, or null for 'solid' (plain color, no map needed).
export function createPatternTexture(pattern, hex) {
  if (!pattern || pattern === 'solid') return null

  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = hex
  ctx.fillRect(0, 0, size, size)

  const dark = shade(hex, -0.4)
  const light = shade(hex, 0.35)

  if (pattern === 'pinstripe') {
    ctx.strokeStyle = dark
    ctx.lineWidth = 7
    for (let x = -size; x < size * 2; x += 30) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x + size, size)
      ctx.stroke()
    }
  } else if (pattern === 'dots') {
    ctx.fillStyle = dark
    const step = 28
    for (let y = step / 2; y < size; y += step) {
      for (let x = step / 2; x < size; x += step) {
        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  } else if (pattern === 'splatter') {
    const rand = makeRng(42)
    for (let i = 0; i < 90; i += 1) {
      ctx.fillStyle = rand() > 0.5 ? dark : light
      const x = rand() * size
      const y = rand() * size
      const r = 3 + rand() * 9
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(3, 3)
  texture.needsUpdate = true
  return texture
}

const CLIPART_DRAWERS = {
  star(ctx, size, color) {
    const cx = size / 2
    const cy = size / 2
    const spikes = 5
    const outerR = size * 0.42
    const innerR = size * 0.18
    let rot = (Math.PI / 2) * 3
    const step = Math.PI / spikes
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(cx, cy - outerR)
    for (let i = 0; i < spikes; i += 1) {
      ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR)
      rot += step
      ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR)
      rot += step
    }
    ctx.closePath()
    ctx.fill()
  },
  bolt(ctx, size, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(size * 0.55, size * 0.05)
    ctx.lineTo(size * 0.25, size * 0.55)
    ctx.lineTo(size * 0.45, size * 0.55)
    ctx.lineTo(size * 0.35, size * 0.95)
    ctx.lineTo(size * 0.75, size * 0.4)
    ctx.lineTo(size * 0.52, size * 0.4)
    ctx.lineTo(size * 0.62, size * 0.05)
    ctx.closePath()
    ctx.fill()
  },
  flame(ctx, size, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(size * 0.5, size * 0.04)
    ctx.bezierCurveTo(size * 0.08, size * 0.38, size * 0.22, size * 0.68, size * 0.46, size * 0.96)
    ctx.bezierCurveTo(size * 0.3, size * 0.74, size * 0.4, size * 0.56, size * 0.5, size * 0.56)
    ctx.bezierCurveTo(size * 0.6, size * 0.56, size * 0.7, size * 0.74, size * 0.54, size * 0.96)
    ctx.bezierCurveTo(size * 0.78, size * 0.68, size * 0.92, size * 0.38, size * 0.5, size * 0.04)
    ctx.closePath()
    ctx.fill()
  },
  crown(ctx, size, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(size * 0.1, size * 0.78)
    ctx.lineTo(size * 0.18, size * 0.3)
    ctx.lineTo(size * 0.37, size * 0.55)
    ctx.lineTo(size * 0.5, size * 0.18)
    ctx.lineTo(size * 0.63, size * 0.55)
    ctx.lineTo(size * 0.82, size * 0.3)
    ctx.lineTo(size * 0.9, size * 0.78)
    ctx.closePath()
    ctx.fill()
  },
}

export const CLIPARTS = [
  { id: 'star', label: 'Star' },
  { id: 'bolt', label: 'Bolt' },
  { id: 'flame', label: 'Flame' },
  { id: 'crown', label: 'Crown' },
]

// Transparent-background CanvasTexture with a single shape drawn in `color`,
// used as a Decal map so only the shape itself prints onto the ball.
export function createClipartTexture(id, color = '#111111') {
  const drawer = CLIPART_DRAWERS[id]
  if (!drawer) return null

  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, size, size)
  drawer(ctx, size, color)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}
