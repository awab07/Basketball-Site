import { motion } from 'motion/react'
import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import BasketballPreview from '@/shared/components/ball-viewer/BasketballPreview'
import { Button } from '@/shared/ui/button'

const Basketball3D = lazy(() => import('@/shared/components/ball-viewer/Basketball3D'))

// Matches the design editor's Viewer framing: tilted down so the name/badge
// panel near the top of the ball reads straight-on instead of foreshortened
// at the rim, and held still (no idle tumble) for a clean, static shot.
const PREVIEW_CAMERA_ELEVATION = 20
const PREVIEW_CAMERA_DISTANCE = 3.3
const PREVIEW_CAMERA_POSITION = [0, PREVIEW_CAMERA_ELEVATION * PREVIEW_CAMERA_DISTANCE, PREVIEW_CAMERA_DISTANCE]

const STEPS = ['Placed', 'Printing', 'Shipped', 'Delivered']

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

function CheckIcon(props) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden {...props}>
      <path d="M5 11.5l4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StatusTimeline({ activeStep = 0 }) {
  return (
    <ol className="mx-auto flex w-full max-w-[420px] items-start">
      {STEPS.map((label, i) => (
        <li key={label} className="flex flex-1 flex-col items-center last:flex-none">
          <div className="flex w-full items-center">
            <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
              {i === activeStep && (
                <motion.span
                  aria-hidden
                  className="absolute inline-flex h-full w-full rounded-full bg-[var(--ink)]/50"
                  animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <span
                className={`relative h-3.5 w-3.5 rounded-full ${
                  i <= activeStep ? 'bg-[var(--ink)]' : 'border-2 border-[var(--ink)]/20 bg-transparent'
                }`}
              />
            </span>
            {i < STEPS.length - 1 && (
              <span className={`mx-1.5 h-px flex-1 ${i < activeStep ? 'bg-[var(--ink)]' : 'bg-[var(--ink)]/15'}`} />
            )}
          </div>
          <span
            className={`mt-2 text-xs ${i <= activeStep ? 'font-semibold text-[var(--ink)]' : 'text-[var(--ink)]/40'}`}
          >
            {label}
          </span>
        </li>
      ))}
    </ol>
  )
}

function OrderPlaced({ orderNumber, items, itemCount, subtotal, shipping, total, shipTo }) {
  const hero = items[0]
  const shipToLine = [shipTo.fullName, shipTo.address, shipTo.city].filter(Boolean).join(', ')
  const heroLabel = hero && !hero.hasLogo ? hero.label : ''

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto flex max-w-[480px] flex-col items-center gap-6 px-4 py-16 text-center sm:py-24"
    >
      <motion.div variants={item} className="relative flex h-14 w-14 items-center justify-center">
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-emerald-300/50"
          animate={{ scale: [1, 1.8], opacity: [0.55, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.9 }}
        />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-[0_10px_26px_-8px_rgba(16,185,129,0.55)]">
          <CheckIcon />
        </span>
      </motion.div>

      <motion.div variants={item}>
        <h1 className="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ink)]">
          Order placed
        </h1>
        <p className="mt-2 text-sm text-[var(--ink)]/55">
          Order #{orderNumber} &middot; A confirmation has been sent to your email
        </p>
      </motion.div>

      {hero && (
        <motion.div variants={item} className="relative flex h-64 w-64 items-center justify-center">
          <div
            aria-hidden
            className="pointer-events-none absolute h-[75%] w-[75%] rounded-full blur-3xl transition-colors duration-500"
            style={{ background: `${hero.color}45` }}
          />
          <div className="relative h-56 w-56">
            <Suspense
              fallback={
                <BasketballPreview panelColor={hero.color} label={heroLabel} className="h-full w-full" />
              }
            >
              <Basketball3D
                color={hero.color}
                label={heroLabel}
                initialCameraPosition={PREVIEW_CAMERA_POSITION}
                spin={false}
              />
            </Suspense>
          </div>
        </motion.div>
      )}

      <motion.div variants={item} className="flex w-full flex-col items-center gap-2">
        <StatusTimeline activeStep={0} />
        <p className="text-xs text-[var(--ink)]/45">Estimated delivery: 5 to 7 days</p>
      </motion.div>

      <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3">
        <Button
          type="button"
          size="lg"
          className="bg-[var(--ink)] hover:bg-[var(--ink-soft)] hover:shadow-[0_0_28px_rgba(28,25,23,0.4)]"
        >
          Track order
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/design">Design another ball</Link>
        </Button>
      </motion.div>

      <motion.div
        variants={item}
        className="mt-2 w-full rounded-[22px] border border-[var(--ink)]/[0.08] bg-[var(--studio-panel)] p-6 text-left shadow-[0_24px_50px_-28px_rgba(28,25,23,0.3)]"
      >
        <h2 className="text-sm font-semibold uppercase tracking-[2px] text-[var(--ink)]/80">Order details</h2>
        <ul className="mt-4 flex flex-col gap-2 text-sm text-[var(--ink)]/70">
          <li className="flex items-center justify-between">
            <span>
              {itemCount} custom basketball{itemCount === 1 ? '' : 's'}
            </span>
            <span>${subtotal}</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Shipping</span>
            <span>${shipping}</span>
          </li>
        </ul>
        <div className="mt-3 flex items-center justify-between border-t border-[var(--ink)]/10 pt-3 text-base font-semibold text-[var(--ink)]">
          <span>Total paid</span>
          <span>${total}</span>
        </div>
        {shipToLine && <p className="mt-4 text-xs text-[var(--ink)]/45">Ships to: {shipToLine}</p>}
      </motion.div>
    </motion.div>
  )
}

export default OrderPlaced
