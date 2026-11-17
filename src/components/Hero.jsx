import { motion } from 'motion/react'
import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import BasketballPreview from './BasketballPreview'

const Basketball3D = lazy(() => import('./Basketball3D'))

const STEP_ITEMS = ['1. Choose colors', '2. Add your name', '3. Make it yours']

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const btnAccent =
  'inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(255,87,34,0.5)] active:scale-[0.97]'
const btnOutlineLight =
  'inline-flex items-center justify-center rounded-full border border-[var(--line-dark)] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white/50 hover:bg-white/5 active:scale-[0.97]'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[var(--ink)] pt-44 pb-24 text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(45% 55% at 78% 45%, rgba(255,87,34,0.16), transparent 70%), radial-gradient(30% 30% at 15% 85%, rgba(255,255,255,0.04), transparent)',
        }}
      />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div>
          <motion.p
            variants={item}
            className="mb-4 text-xs font-semibold uppercase tracking-[2.5px] text-[var(--accent)]"
          >
            Custom basketballs, built by you
          </motion.p>

          <motion.h1
            variants={item}
            className="font-[var(--font-display)] text-[clamp(42px,6.5vw,76px)] font-medium leading-[0.98] tracking-[-0.02em]"
          >
            Design your
            <br />
            own basketball.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[var(--muted-on-dark)]"
          >
            A live editor that turns your colors, your name, and your idea
            into a basketball built to order — see every change the moment
            you make it.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold"
          >
            {STEP_ITEMS.map((label, i) => (
              <span key={label} className="flex items-center gap-x-8">
                <span className={i === 0 ? 'text-white' : 'text-white/70 transition-colors hover:text-white'}>
                  {label}
                </span>
                {i < STEP_ITEMS.length - 1 && (
                  <span aria-hidden className="text-[var(--accent)]">→</span>
                )}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <Link className={btnAccent} to="/design">Start Designing</Link>
            <a className={btnOutlineLight} href="#how">See how it works</a>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[420px]"
        >
          <div
            className="pointer-events-none absolute h-[70%] w-[70%] rounded-full blur-3xl"
            style={{ background: 'rgba(255,87,34,0.28)' }}
          />
          <Suspense
            fallback={
              <BasketballPreview
                panelColor="#ff6b2c"
                className="relative w-full max-w-[280px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              />
            }
          >
            <div className="relative h-full w-full">
              <Basketball3D color="#ff6b2c" />
            </div>
          </Suspense>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
