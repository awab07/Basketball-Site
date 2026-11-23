import { lazy, Suspense } from 'react'
import { BALL_SIZES } from '@/features/basketball-customizer/lib/editorConfig'
import BasketballPreview from '@/shared/components/ball-viewer/BasketballPreview'

const Basketball3D = lazy(() => import('@/shared/components/ball-viewer/Basketball3D'))

// Rotation is locked here, so the name panel (placed high, near the top of
// the ball) needs the camera tilted down at it from the start — straight-on
// (elevation 0) leaves it foreshortened right at the rim of the sphere.
// Same distance as the plain default, just raised to look down a bit.
const PREVIEW_CAMERA_ELEVATION = 0.7
const PREVIEW_CAMERA_DISTANCE = 3.3
const PREVIEW_CAMERA_POSITION = [0, PREVIEW_CAMERA_ELEVATION * PREVIEW_CAMERA_DISTANCE, PREVIEW_CAMERA_DISTANCE]

function Viewer({ design }) {
  const sizeScale = BALL_SIZES.find((s) => s.id === design.size)?.scale ?? 1

  return (
    <div className="relative flex min-w-0 flex-col items-center justify-center rounded-[22px] border border-white/[0.08] bg-black/20 p-4 sm:p-6 lg:p-10">
      <h3 className="mb-4 self-start text-sm font-semibold uppercase tracking-[2px] text-white/90">3D Preview</h3>
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
    </div>
  )
}

export default Viewer
