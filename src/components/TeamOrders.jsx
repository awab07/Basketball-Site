import { Link } from 'react-router-dom'
import MiniBasketball from './MiniBasketball'
import { Button } from './ui/button'
import { Card } from './ui/card'

const PERKS = [
  'Upload a roster CSV: name + number per ball',
  'Tiered discounts at 10+, 25+ and 50+ balls',
  'Free design help from our team',
]

const TIERS = [
  { qty: '10+ balls', off: '10% off' },
  { qty: '25+ balls', off: '20% off' },
  { qty: '50+ balls', off: '30% off' },
]

const TEAM_COLOR = '#2743c7'
const ROSTER_NUMBERS = ['4', '7', '11', '23', '32']

function CheckIcon(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden {...props}>
      <path d="M2.5 7.2l3 3L11.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TeamOrders() {
  return (
    <section id="team-orders" className="bg-[var(--ink)] py-20 text-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[2.5px] text-[var(--accent)]">
            Bulk and team orders
          </p>
          <h2 className="font-[var(--font-display)] text-[clamp(28px,3.6vw,38px)] font-semibold leading-[1.1] tracking-tight text-white">
            Kit out your whole team
          </h2>

          <ul className="mt-6 flex flex-col gap-3">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-3 text-sm text-white/70">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--accent)]">
                  <CheckIcon />
                </span>
                {perk}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/design">Get a team quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#">Download roster template</a>
            </Button>
          </div>
        </div>

        <Card className="p-6 sm:p-8">
          <div className="flex items-end justify-center -space-x-5">
            {ROSTER_NUMBERS.map((num) => (
              <MiniBasketball key={num} hex={TEAM_COLOR} label={num} size="h-20 w-20" glow={false} />
            ))}
          </div>

          <p className="mt-5 text-center text-xs text-white/40">One roster, one matching set</p>

          <div className="mt-7 overflow-hidden rounded-[14px] border border-white/[0.08]">
            {TIERS.map((tier, i) => (
              <div
                key={tier.qty}
                className={`flex items-center justify-between px-4 py-3 text-sm ${
                  i > 0 ? 'border-t border-white/[0.08]' : ''
                }`}
              >
                <span className="font-medium text-white/80">{tier.qty}</span>
                <span className="font-semibold text-[var(--accent)]">{tier.off}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

export default TeamOrders
