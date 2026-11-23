import { Decal, Text, useGLTF, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createClipartTexture, createPatternTexture } from './textures'

const MODEL_URL = '/basketball.glb'
// Arimo, not Arial itself: troika needs an actual font file, and Arial's is
// Microsoft-licensed, not ours to ship to every site visitor. Arimo is built
// to be metrically and visually equivalent to Arial under an open license.
const STAMP_FONT_URL = '/fonts/Arimo-Regular.ttf'
const MODEL_RADIUS = 0.97

// Four stamps (name, logo, number, clipart) share the one panel shell, so
// each gets its own azimuth spaced 90deg apart around the equator — far
// enough apart that no combination of active layers ever overlaps.
const AZIMUTH = {
  text: Math.PI / 6,
  logo: (Math.PI * 2) / 3,
  number: Math.PI + Math.PI / 6,
  clipart: -Math.PI / 3,
}

function surfacePoint(azimuth) {
  return [Math.sin(azimuth) * MODEL_RADIUS, 0, Math.cos(azimuth) * MODEL_RADIUS]
}

// Random point on the unit sphere, so the tumble axis has no bias toward
// any particular direction.
function randomAxis() {
  const u = Math.random() * 2 - 1
  const theta = Math.random() * Math.PI * 2
  const r = Math.sqrt(1 - u * u)
  return { x: r * Math.cos(theta), y: u, z: r * Math.sin(theta) }
}

function BasketballMesh({
  color,
  spinSpeed,
  radius = 1,
  label = '',
  labelColor = '#111111',
  pattern = 'solid',
  number = '',
  numberColor = '#111111',
  logoDataUrl = null,
  logoRotation = 0,
  logoScale = 0.55,
  clipartId = null,
  clipartColor = '#111111',
  clipartRotation = 0,
  clipartScale = 0.32,
}) {
  const groupRef = useRef(null)
  const { scene } = useGLTF(MODEL_URL)
  // Static previews run frameloop="demand", which only repaints when
  // something calls invalidate() — any imperative mutation below (material
  // colors/maps, the group's rotation) needs to call this itself, since none
  // of it goes through react-three-fiber's own prop-diffing.
  const invalidate = useThree((state) => state.invalidate)

  // Clone per instance (Hero + Studio both mount this) so each gets its own
  // materials instead of mutating drei's single cached GLTF scene.
  const model = useMemo(() => {
    const cloned = scene.clone(true)
    cloned.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone()
        // Remember the model's own grain map so plain-colour balls can go back to it.
        child.userData.baseMap = child.material.map
        child.castShadow = true
        child.receiveShadow = true
        // The seam/print shell sits just above the panels; don't let it hide decals.
        if (child.material.transparent) child.material.depthWrite = false
      }
    })
    return cloned
  }, [scene])

  // The model ships as two meshes: the panel shell ("Basketball_0", pebble
  // grain that takes the chosen colour) and a thin shell just above it
  // ("Basketball_1") carrying the black channel seams and printing.
  // Only the panel shell should recolor — the seams stay black like a real ball's.
  //
  // Decal needs a ref-shaped `{ current: mesh }` handle to project against.
  // A plain memoized object (rather than a real ref mutated in an effect)
  // means it's available on the very first render, before any child
  // effects run — no ordering race with when the decal itself mounts.
  const panelHandle = useMemo(() => ({ current: model.getObjectByName('Basketball_0') }), [model])

  useEffect(() => {
    const panelMesh = model.getObjectByName('Basketball_0')
    if (!panelMesh) return undefined
    panelMesh.material.color.set(color)
    const texture = createPatternTexture(pattern, color)
    panelMesh.material.map = texture ?? panelMesh.userData.baseMap ?? null
    panelMesh.material.needsUpdate = true
    invalidate()
    return () => texture?.dispose()
  }, [model, color, pattern, invalidate])

  // Current and target angular velocity (rad/s per axis). The target is
  // re-rolled at random intervals and the current value eases toward it,
  // so the ball tumbles around a drifting, unpredictable axis instead of
  // spinning cleanly around one.
  const velocity = useRef(randomAxis())
  const target = useRef(randomAxis())
  const timeToNextTarget = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current || spinSpeed <= 0) return

    timeToNextTarget.current -= delta
    if (timeToNextTarget.current <= 0) {
      target.current = randomAxis()
      timeToNextTarget.current = 1.5 + Math.random() * 2.5
    }

    const ease = 1 - Math.pow(0.001, delta)
    velocity.current.x += (target.current.x - velocity.current.x) * ease
    velocity.current.y += (target.current.y - velocity.current.y) * ease
    velocity.current.z += (target.current.z - velocity.current.z) * ease

    groupRef.current.rotation.x += velocity.current.x * spinSpeed * delta
    groupRef.current.rotation.y += velocity.current.y * spinSpeed * delta
    groupRef.current.rotation.z += velocity.current.z * spinSpeed * delta
  })

  // NAME_PANEL sits at lon -90deg, which is side-on (z=0) from the default
  // camera — fine when drag/the old view buttons could bring it around, but
  // with rotation now locked in some viewers it would never be seen. Spin
  // the group once on mount so that panel lands facing the camera at rest.
  // A plain mount effect (not a `rotation` JSX prop) so it doesn't fight the
  // tumble animation's own incremental updates on later re-renders.
  useEffect(() => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = NAME_FACING_OFFSET
    invalidate()
  }, [invalidate])

  const trimmedLabel = label.trim()
  const trimmedNumber = number.trim()

  return (
    <group ref={groupRef} scale={radius}>
      <primitive object={model} />

      {trimmedLabel && (
        <PanelStamp text={trimmedLabel.toUpperCase()} color={labelColor} />
      )}
      {trimmedNumber && (
        <BallStamp text={trimmedNumber.toUpperCase()} color={numberColor} azimuth={AZIMUTH.number} />
      )}

      {logoDataUrl && (
        <Suspense fallback={null}>
          <LogoDecal
            meshRef={panelHandle}
            dataUrl={logoDataUrl}
            rotation={logoRotation}
            scale={logoScale}
          />
        </Suspense>
      )}

      {clipartId && (
        <ClipartDecal
          meshRef={panelHandle}
          id={clipartId}
          color={clipartColor}
          rotation={clipartRotation}
          scale={clipartScale}
        />
      )}
    </group>
  )
}

// The name sits level across the open panel just above the printed badge
// (between the curved seam and the top seam), facing the same way as the
// badge. Placed by latitude/longitude on the ball and oriented with the
// local east / north / outward axes so it lies flush and reads upright.
const NAME_PANEL = { lat: THREE.MathUtils.degToRad(70), lon: -Math.PI / 2 }
// Rotating the group by -NAME_PANEL.lon brings that panel to azimuth 0 (camera-facing).
const NAME_FACING_OFFSET = -NAME_PANEL.lon

function PanelStamp({ text, color }) {
  const { position, orientation } = useMemo(() => {
    const { lat, lon } = NAME_PANEL
    const normal = new THREE.Vector3(Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon))
    const east = new THREE.Vector3(Math.cos(lon), 0, -Math.sin(lon))
    const north = new THREE.Vector3().crossVectors(normal, east)
    const basis = new THREE.Matrix4().makeBasis(east, north, normal)
    return {
      position: normal.clone().multiplyScalar(MODEL_RADIUS + 0.005).toArray(),
      orientation: new THREE.Quaternion().setFromRotationMatrix(basis),
    }
  }, [])

  return (
    <Text
      font={STAMP_FONT_URL}
      position={position}
      quaternion={orientation}
      curveRadius={-MODEL_RADIUS}
      fontSize={0.2}
      maxWidth={0.95}
      lineHeight={1}
      textAlign="center"
      anchorX="center"
      anchorY="middle"
      letterSpacing={0.02}
      color={color}
    >
      {text}
      {/* troika's own fallback text material is DoubleSide; a bare meshStandardMaterial
          defaults to FrontSide, which back-face-culls the glyphs to nothing whenever this
          stamp's curved, quaternion-oriented geometry ends up facing the "wrong" way. */}
      <meshStandardMaterial attach="material" roughness={0.7} metalness={0} side={THREE.DoubleSide} />
    </Text>
  )
}

// A single clean wordmark running top-to-bottom down the panel, like a real
// ball's vertical branding, offset off the front seam onto the panel proper.
// curveRadius
// bends it along the model's own radius (negative = bulges toward the viewer
// at the center, receding at the edges, matching a true geodesic on the
// sphere) so it hugs the surface, and the orientation quaternion both spins
// it vertical and tilts it to match the local surface normal at its
// azimuth, so it sits flush instead of floating off-angle from the curve
// at that point.
function BallStamp({ text, color, azimuth }) {
  const { position, orientation } = useMemo(() => {
    const normal = new THREE.Vector3(Math.sin(azimuth), 0, Math.cos(azimuth))
    const spin = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 2)
    const swing = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), azimuth)
    return {
      position: normal.multiplyScalar(MODEL_RADIUS + 0.005).toArray(),
      orientation: swing.multiply(spin),
    }
  }, [azimuth])

  return (
    <Text
      font={STAMP_FONT_URL}
      position={position}
      quaternion={orientation}
      curveRadius={-MODEL_RADIUS}
      fontSize={0.27}
      maxWidth={1.3}
      textAlign="center"
      anchorX="center"
      anchorY="middle"
      letterSpacing={0.015}
      color={color}
    >
      {text}
      <meshStandardMaterial attach="material" roughness={0.7} metalness={0} side={THREE.DoubleSide} />
    </Text>
  )
}

// Decal's auto-orientation (no `rotation` vector given, just a twist number)
// finds the panel's closest vertex normal to `position` and faces the
// sticker along it — the same "flush against the curve" result as the text
// stamp's quaternion math, without having to hand-derive it again here. The
// shallow z in `scale` keeps the projection box thin so it only wraps the
// local patch of curvature instead of bleeding onto the opposite side of
// the ball.
function LogoDecal({ meshRef, dataUrl, rotation, scale }) {
  const texture = useTexture(dataUrl)
  const position = useMemo(() => surfacePoint(AZIMUTH.logo), [])
  const size = typeof scale === 'number' ? scale : 0.55

  return (
    <Decal mesh={meshRef} position={position} rotation={rotation} scale={[size, size, size * 0.5]}>
      <meshStandardMaterial map={texture} transparent roughness={0.8} metalness={0} />
    </Decal>
  )
}

function ClipartDecal({ meshRef, id, color, rotation, scale }) {
  const texture = useMemo(() => createClipartTexture(id, color), [id, color])
  const position = useMemo(() => surfacePoint(AZIMUTH.clipart), [])
  const size = typeof scale === 'number' ? scale : 0.32

  useEffect(() => () => texture?.dispose(), [texture])

  if (!texture) return null

  return (
    <Decal mesh={meshRef} position={position} rotation={rotation} scale={[size, size, size * 0.6]}>
      <meshStandardMaterial map={texture} transparent roughness={0.8} metalness={0} />
    </Decal>
  )
}

useGLTF.preload(MODEL_URL)

export default BasketballMesh
