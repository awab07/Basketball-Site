import { lazy, Suspense, useRef } from 'react'
import { BALL_SIZES } from '@/features/basketball-customizer/lib/editorConfig'
import BasketballPreview from '@/shared/components/ball-viewer/BasketballPreview'

const Basketball3D = lazy(() => import('@/shared/components/ball-viewer/Basketball3D'))

// Rotation is locked here, so the name panel (placed high, near the top of
// the ball) needs the camera tilted down at it from the start — straight-on
// (elevation 0) leaves it foreshortened right at the rim of the sphere.
// Same distance as the plain default, just raised to look down a bit.
const PREVIEW_CAMERA_ELEVATION = 1.3
const PREVIEW_CAMERA_DISTANCE = 3.3
const PREVIEW_CAMERA_POSITION = [0, PREVIEW_CAMERA_ELEVATION * PREVIEW_CAMERA_DISTANCE, PREVIEW_CAMERA_DISTANCE]

// Matches Basketball3D's own VIEW_PRESETS keys, so these just forward into its
// imperative setView() rather than keeping a second copy of the angles here.
const VIEW_OPTIONS = [
  { id: 'front', label: 'Front' },
  { id: 'right', label: 'Side' },
  { id: 'back', label: 'Back' },
  { id: 'iso', label: 'Angle' },
]

function Viewer({ design }) {
  const sizeScale = BALL_SIZES.find((s) => s.id === design.size)?.scale ?? 1
  const ballRef = useRef(null)

  return (
    <div className="relative flex min-w-0 flex-col items-center justify-center rounded-[22px] border border-[var(--ink)]/[0.08] bg-[var(--studio-panel)] p-4 sm:p-6 lg:p-10">
      <h3 className="mb-4 self-start text-sm font-semibold uppercase tracking-[2px] text-[var(--ink)]/75">3D Preview</h3>
      <div className="relative aspect-square w-full max-w-[360px] sm:max-w-[460px] lg:max-w-[560px]">
        <Suspense
          fallback={
            <BasketballPreview
              panelColor={design.color}
              label={design.text.visible ? design.text.value : ''}
              className="h-full w-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)]"
            />
          }
        >
          <Basketball3D
            ref={ballRef}
            color={design.color}
            pattern={design.pattern}
            label={design.text.visible ? design.text.value : ''}
            labelColor={design.text.color}
            number={design.number.visible ? design.number.value : ''}
            numberColor={design.number.color}
            logoDataUrl={design.logo.visible ? design.logo.dataUrl : null}
            clipartId={design.clipart.visible ? design.clipart.id : null}
            clipartColor={design.clipart.color}
            interactive
            enableRotate={false}
            autoRotate={false}
            initialCameraPosition={PREVIEW_CAMERA_POSITION}
            sizeScale={sizeScale}
          />
        </Suspense>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {VIEW_OPTIONS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => ballRef.current?.setView(v.id)}
            className="rounded-full border border-[var(--ink)]/15 px-4 py-2 text-sm font-medium text-[var(--ink)]/70 transition-colors hover:border-[var(--ink)]/30 hover:text-[var(--ink)]"
          >
            {v.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => ballRef.current?.reset()}
          className="rounded-full border border-[var(--ink)]/15 px-4 py-2 text-sm font-medium text-[var(--ink)]/70 transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)]"
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default Viewer
