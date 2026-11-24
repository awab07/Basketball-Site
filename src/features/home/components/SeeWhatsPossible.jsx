import { lazy, Suspense, useId, useState } from 'react'
import BasketballPreview from '@/shared/components/ball-viewer/BasketballPreview'

const Basketball3D = lazy(() => import('@/shared/components/ball-viewer/Basketball3D'))

const PLAIN_COLOR = '#ff6b2c'
const CUSTOM_COLOR = '#4169e1'
const CUSTOM_LABEL = 'BUCKETS'

// Both layers render the same static (non-spinning) ball at the same scale
// and position, so clipping one with clip-path reads as a single ball split
// down the middle rather than two separate images side by side.
function BallLayer({ color, label, clipPercent }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={clipPercent == null ? undefined : { clipPath: `inset(0 ${100 - clipPercent}% 0 0)` }}
    >
      <div className="relative h-[78%] w-[78%]">
        <Suspense
          fallback={<BasketballPreview panelColor={color} label={label} className="h-full w-full" />}
        >
          <Basketball3D color={color} label={label} spin={false} compact />
        </Suspense>
      </div>
    </div>
  )
}

function SeeWhatsPossible() {
  const [pos, setPos] = useState(50)
  const inputId = useId()

  return (
    <section className="bg-[var(--studio-bg)] py-20 text-[var(--ink)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="font-[var(--font-display)] text-[clamp(26px,3.4vw,34px)] font-semibold tracking-tight text-[var(--ink)]">
          See what&apos;s possible
        </h2>
        <p className="mt-2 text-sm text-[var(--ink)]/60">Before / after — drag the slider.</p>

        <div className="relative mx-auto mt-8 aspect-square w-full max-w-[520px] overflow-hidden rounded-[28px] border border-[var(--ink)]/[0.08] bg-[var(--studio-panel)] select-none">
          <BallLayer color={CUSTOM_COLOR} label={CUSTOM_LABEL} />
          <span className="pointer-events-none absolute bottom-4 right-5 text-[11px] font-semibold uppercase tracking-[1.5px] text-[var(--ink)]/55">
            Customized ball
          </span>

          <BallLayer color={PLAIN_COLOR} label="" clipPercent={pos} />
          <span className="pointer-events-none absolute bottom-4 left-5 text-[11px] font-semibold uppercase tracking-[1.5px] text-[var(--ink)]/55">
            Plain ball
          </span>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 w-[2px] -translate-x-1/2 bg-[var(--ink)]/70"
            style={{ left: `${pos}%` }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--ink)]/20 bg-[var(--ink)] text-white shadow-[0_6px_20px_-6px_rgba(28,25,23,0.4)]"
            style={{ left: `${pos}%` }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M4.5 2L1 7l3.5 5M9.5 2L13 7l-3.5 5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <label htmlFor={inputId} className="sr-only">
            Drag to compare the plain ball with the customized ball
          </label>
          <input
            id={inputId}
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            className="absolute inset-0 h-full w-full cursor-ew-resize touch-none appearance-none bg-transparent opacity-0"
          />
        </div>
      </div>
    </section>
  )
}

export default SeeWhatsPossible
