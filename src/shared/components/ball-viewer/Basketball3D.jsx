import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { forwardRef, Suspense, useImperativeHandle, useRef } from 'react'
import * as THREE from 'three'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js'
import BasketballMesh from './BasketballMesh'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'

// Every mounted ball (hero, grid tiles, editor previews) creates its own
// Canvas/Lighting, but this LTC lookup-table setup is global, one-time GPU
// state — doing it again on every mount is pure waste. The module only
// evaluates once, so this runs exactly once for the page's whole lifetime.
RectAreaLightUniformsLib.init()

// Camera sits at CAMERA_Z with FOV_DEG vertical field of view. Keeping the
// ball's diameter comfortably smaller than the visible frustum height at
// that distance is what prevents it from being clipped by the canvas edges.
const CAMERA_Z = 3.3
const FOV_DEG = 32
const BALL_RADIUS = 0.78
const BALL_BOTTOM_Y = -BALL_RADIUS - 0.02
const MIN_DISTANCE = 2.2
const MAX_DISTANCE = 5.2

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      
      <rectAreaLight
        position={[2.2, 2.6, 2.8]}
        rotation={[-0.4, 0.5, 0]}
        width={3.5}
        height={3.5}
        intensity={6}
        color="#fff4e6"
      />
      <directionalLight
        position={[3, 4, 4]}
        intensity={0.9}
        color="#fff4e8"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, -1, -2]} intensity={0.18} color="#cfd6ff" />
      <pointLight position={[-2, 1.2, 1.6]} intensity={0.22} color="#ff8a4c" />
    </>
  )
}

// interactive=true swaps the ambient random-tumble for drag/scroll
// OrbitControls, so the mesh itself goes still (avoiding two motions
// fighting each other) and the camera's own autoRotate takes over idle spin.
// compact=true is for small repeated grid uses (style/gallery tiles) — it
// drops shadow mapping and caps dpr so a page with many of these mounted at
// once stays cheap, instead of each one paying for a full shadow pass.
const VIEW_PRESETS = {
  front: { azimuth: 0, elevation: 0 },
  right: { azimuth: Math.PI / 2, elevation: 0 },
  back: { azimuth: Math.PI, elevation: 0 },
  left: { azimuth: -Math.PI / 2, elevation: 0 },
  iso: { azimuth: Math.PI / 5, elevation: 0.22 },
}

const Basketball3D = forwardRef(function Basketball3D(
  {
    color = '#ff6b2c',
    interactive = false,
    enableRotate = true,
    autoRotate = true,
    initialCameraPosition = null,
    label = '',
    labelColor,
    pattern,
    number,
    numberColor,
    logoDataUrl,
    logoRotation,
    logoScale,
    clipartId,
    clipartColor,
    clipartRotation,
    clipartScale,
    compact = false,
    spin = true,
  },
  ref,
) {
  const reducedMotion = usePrefersReducedMotion()
  const controlsRef = useRef(null)

  useImperativeHandle(
    ref,
    () => ({
      reset() {
        controlsRef.current?.reset()
      },
      zoom(factor) {
        const controls = controlsRef.current
        if (!controls) return
        const offset = new THREE.Vector3().subVectors(controls.object.position, controls.target)
        const distance = THREE.MathUtils.clamp(offset.length() * factor, MIN_DISTANCE, MAX_DISTANCE)
        offset.setLength(distance)
        controls.object.position.copy(controls.target).add(offset)
        controls.update()
      },
      setView(view) {
        const controls = controlsRef.current
        if (!controls) return
        const offset = new THREE.Vector3().subVectors(controls.object.position, controls.target)
        const distance = THREE.MathUtils.clamp(offset.length(), MIN_DISTANCE, MAX_DISTANCE)
        const { azimuth, elevation } = VIEW_PRESETS[view] ?? VIEW_PRESETS.front
        controls.object.position.set(
          controls.target.x + Math.sin(azimuth) * distance,
          controls.target.y + elevation * distance,
          controls.target.z + Math.cos(azimuth) * distance,
        )
        controls.update()
      },
    }),
    [],
  )

  const meshSpin = !spin || reducedMotion ? 0 : interactive ? 0 : 0.35

  // A still ball (no idle tumble, and no auto-rotating orbit) never changes
  // on its own, so there's nothing to gain from rendering it 60 times a
  // second forever — e.g. the design editor's preview, which sits interactive
  // but non-rotating while someone types a name or picks a color. frameloop
  // "demand" renders once and then only again when something actually
  // changes (a prop update, or drag/zoom on the controls below, which drei's
  // OrbitControls wires up to invalidate on its own).
  const needsContinuousFrames = meshSpin > 0 || (interactive && autoRotate && !reducedMotion)

  return (
    <Canvas
      shadows={!compact}
      dpr={compact ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: initialCameraPosition ?? [0, 0, CAMERA_Z], fov: FOV_DEG }}
      frameloop={needsContinuousFrames ? 'always' : 'demand'}
    >
      <Lighting />

      <Suspense fallback={null}>
        <BasketballMesh
          color={color}
          radius={BALL_RADIUS}
          spinSpeed={meshSpin}
          label={label}
          labelColor={labelColor}
          pattern={pattern}
          number={number}
          numberColor={numberColor}
          logoDataUrl={logoDataUrl}
          logoRotation={logoRotation}
          logoScale={logoScale}
          clipartId={clipartId}
          clipartColor={clipartColor}
          clipartRotation={clipartRotation}
          clipartScale={clipartScale}
        />
      </Suspense>

      {!compact && (
        // scale is far larger than the frustum so its falloff edge is never visible
        <ContactShadows
          position={[0, BALL_BOTTOM_Y, 0]}
          opacity={0.5}
          scale={8}
          blur={3}
          far={1.4}
          resolution={512}
          color="#000000"
        />
      )}

      {interactive && (
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enablePan={false}
          enableRotate={enableRotate}
          enableZoom
          enableDamping
          dampingFactor={0.08}
          autoRotate={autoRotate && !reducedMotion}
          autoRotateSpeed={1.1}
          minDistance={MIN_DISTANCE}
          maxDistance={MAX_DISTANCE}
          minPolarAngle={Math.PI * 0.18}
          maxPolarAngle={Math.PI * 0.82}
        />
      )}
    </Canvas>
  )
})

export default Basketball3D
