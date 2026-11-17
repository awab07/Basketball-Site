import { lazy, Suspense, useRef } from 'react'
import BasketballPreview from '../BasketballPreview'
import { Button } from '../ui/button'

const Basketball3D = lazy(() => import('../Basketball3D'))

const VIEWS = [
  { id: 'front', label: 'Front' },
  { id: 'back', label: 'Back' },
  { id: 'left', label: 'Left' },
  { id: 'right', label: 'Right' },
  { id: 'iso', label: '3D view' },
]

function Viewer({ design }) {
  const ballRef = useRef(null)

  return (
    <div className="order-1 relative flex min-w-0 flex-none flex-col items-center justify-center bg-black/20 p-4 sm:p-6 lg:order-none lg:flex-1">
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
            autoRotate={false}
          />
        </Suspense>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-1.5 backdrop-blur-md">
        {VIEWS.map((view) => (
          <Button
            key={view.id}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => ballRef.current?.setView(view.id)}
          >
            {view.label}
          </Button>
        ))}
        <span className="mx-1 h-5 w-px bg-white/10" aria-hidden />
        <Button type="button" variant="outline" size="icon" aria-label="Zoom out" onClick={() => ballRef.current?.zoom(1.2)}>
          −
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Zoom in"
          onClick={() => ballRef.current?.zoom(1 / 1.2)}
        >
          +
        </Button>
      </div>

      <p className="mt-3 text-[11px] text-white/35">Drag to rotate · Scroll to zoom · Click a view to snap to it</p>
    </div>
  )
}

export default Viewer
