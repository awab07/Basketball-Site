import { motion } from 'motion/react'
import MiniBasketball from './MiniBasketball'
import { Card } from './ui/card'

const GALLERY = [
  { label: 'Sunset Fade', hex: '#ff6b2c' },
  { label: 'Blackout', hex: '#1a1a1a' },
  { label: 'Midnight', hex: '#1d3461' },
  { label: 'Varsity Red', hex: '#c62828' },
  { label: 'Pine', hex: '#2e5339' },
  { label: 'Fog', hex: '#6b6375' },
  { label: 'Royal', hex: '#2743c7' },
  { label: 'Gold Rush', hex: '#b8860b' },
]

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function GalleryCard({ item }) {
  return (
    <motion.div variants={fadeUp}>
      <Card className="flex flex-col items-center p-6 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
        <MiniBasketball hex={item.hex} size="h-20 w-20" />
        <span className="mt-4 text-xs font-semibold tracking-wide text-white/70">
          {item.label}
        </span>
      </Card>
    </motion.div>
  )
}

function GallerySection() {
  return (
    <section className="relative overflow-hidden bg-[var(--ink-soft)] py-24 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(255,87,34,0.06), transparent 70%)',
        }}
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="relative mx-auto max-w-[1200px] px-6"
      >
        <motion.div variants={fadeUp} className="mx-auto mb-14 max-w-[620px] text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[2.5px] text-white/70">
            From the community
          </p>
          <h2 className="font-[var(--font-display)] text-[clamp(28px,4vw,42px)] leading-[1.1] tracking-tight">
            Every ball is one of one
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {GALLERY.map((g) => (
            <GalleryCard key={g.label} item={g} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default GallerySection
