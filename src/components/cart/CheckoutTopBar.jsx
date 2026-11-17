import { Link } from 'react-router-dom'
import { Logomark } from '../Navbar'

const STEPS = [
  { n: 1, label: 'Cart' },
  { n: 2, label: 'Shipping' },
  { n: 3, label: 'Payment' },
]

function LockIcon(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden {...props}>
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.4" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.2 7V5a2.8 2.8 0 015.6 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function CheckoutTopBar({ activeStep = 1 }) {
  return (
    <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-black/40 px-4 py-3 backdrop-blur-xl sm:px-6">
      <Link to="/" className="flex shrink-0 items-center gap-2">
        <Logomark />
        <span className="hidden font-[var(--font-display)] text-sm font-medium text-white sm:inline">
          Build-A-Basketball
        </span>
      </Link>

      <ol className="flex items-center gap-1.5 sm:gap-2.5">
        {STEPS.map((step, i) => (
          <li key={step.n} className="flex items-center gap-1.5 sm:gap-2.5">
            <span
              className={`flex items-center gap-1.5 text-xs font-semibold sm:text-sm ${
                step.n === activeStep ? 'text-white' : 'text-white/35'
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
                  step.n === activeStep
                    ? 'bg-[var(--accent)] text-white'
                    : 'border border-white/20 text-white/40'
                }`}
              >
                {step.n}
              </span>
              <span className="hidden sm:inline">{step.label}</span>
            </span>
            {i < STEPS.length - 1 && <span aria-hidden className="h-px w-4 bg-white/15 sm:w-8" />}
          </li>
        ))}
      </ol>

      <span className="hidden shrink-0 items-center gap-1.5 text-xs font-medium text-white/50 sm:flex">
        <LockIcon />
        Secure checkout
      </span>
    </header>
  )
}

export default CheckoutTopBar
