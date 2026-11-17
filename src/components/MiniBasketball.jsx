import { useInView } from 'motion/react'
import { lazy, Suspense, useRef } from 'react'
import BasketballPreview from './BasketballPreview'

const Basketball3D = lazy(() => import('./Basketball3D'))

// Mounts the real 3D model only while its spot in a grid is actually in
// view, and unmounts it again once scrolled away — a page with a dozen of
// these holding a dozen live WebGL contexts at once runs into the browser's
// per-page context limit, which silently kills the oldest canvas and leaves
// it blank. Capping how many are mounted at a time keeps that bounded
// regardless of how far the page has been scrolled. Renders the flat SVG as
// both the pre-mount and Suspense-loading placeholder so there's never a
// blank gap. `compact` strips shadows/resolution on the 3D view for cheap
// repeated grid use.
//
// `size` must set both a width and a height class (e.g. "h-28 w-28"), not
// just a width with aspect-square — the Canvas measures its parent's actual
// box, and leaving the height to be derived can land it a frame before
// that's resolved, rendering into a non-square box that crops the ball's
// top and bottom.
function MiniBasketball({ hex, label = '', size = 'h-28 w-28', glow = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-80px' })

  return (
    <div ref={ref} className={`relative mx-auto ${size}`}>
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 m-auto h-[70%] w-[70%] rounded-full blur-2xl transition-colors duration-500"
          style={{ background: `${hex}40` }}
        />
      )}
      {inView ? (
        <Suspense
          fallback={<BasketballPreview panelColor={hex} label={label} className="relative h-full w-full" />}
        >
          <Basketball3D color={hex} label={label} compact />
        </Suspense>
      ) : (
        <BasketballPreview panelColor={hex} label={label} className="relative h-full w-full" />
      )}
    </div>
  )
}

export default MiniBasketball
