import { Link } from 'react-router-dom'
import MiniBasketball from '@/shared/components/ball-viewer/MiniBasketball'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'

function TruckIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path d="M2 5.5h9v8H2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M11 9h3.2L17 11.6V13.5h-2" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="6" cy="14.5" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="14" cy="14.5" r="1.6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function ClockIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ShieldIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path
        d="M10 2.5l6 2.2v4.6c0 4-2.6 6.9-6 8.2-3.4-1.3-6-4.2-6-8.2V4.7l6-2.2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M7.3 10l1.9 1.9 3.5-3.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LockIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <rect x="4.5" y="9" width="11" height="7.5" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.5 9V6.5a3.5 3.5 0 017 0V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

const TRUST_ITEMS = [
  { label: 'Free shipping over $50', icon: TruckIcon },
  { label: 'Ships in 5 days', icon: ClockIcon },
  { label: 'Reprint guarantee', icon: ShieldIcon },
  { label: 'Secure payment', icon: LockIcon },
]

const STYLES = [
  { name: 'Classic', hex: '#ff6b2c', blurb: 'The everyday ball. Full-grain feel, built for daily runs.' },
  { name: 'Pro Grip', hex: '#1a1a1a', blurb: 'Deep channels and a tackier cover for serious control.' },
  { name: 'Youth', hex: '#1d3461', blurb: 'Lighter, smaller, sized right for younger hands.' },
  { name: 'Limited', hex: '#c62828', blurb: 'Premium leather and a numbered edition tag.' },
]

function StyleCard({ style }) {
  return (
    <Card className="flex h-full flex-col items-center p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[var(--ink)]/20 hover:bg-[var(--ink)]/[0.04]">
      <MiniBasketball hex={style.hex} size="h-32 w-32 sm:h-36 sm:w-36" />
      <h3 className="mt-6 font-[var(--font-display)] text-xl text-[var(--ink)]">{style.name}</h3>
      <p className="mt-2 mb-7 text-sm leading-relaxed text-[var(--ink)]/60">{style.blurb}</p>
      <Button asChild size="sm" variant="outline" className="mt-auto">
        <Link to={`/design?color=${encodeURIComponent(style.hex)}`}>Select</Link>
      </Button>
    </Card>
  )
}

function ShopBySize() {
  return (
    <section id="styles" className="bg-[var(--studio-bg)] pt-16 pb-10 text-[var(--ink)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TRUST_ITEMS.map(({ label, icon: Icon }) => (
            <Card
              key={label}
              className="flex items-center gap-3 rounded-[16px] px-4 py-3.5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/12 text-[var(--accent)]">
                <Icon />
              </span>
              <span className="text-sm font-medium text-[var(--ink)]/75">{label}</span>
            </Card>
          ))}
        </div>

        <div className="mt-14">
          <h2 className="font-[var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--ink)] sm:text-3xl">
            Shop by size
          </h2>
          <p className="mt-2 text-sm text-[var(--ink)]/60">Pick a base ball to start customizing.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STYLES.map((style) => (
            <StyleCard key={style.name} style={style} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopBySize
