import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { Button } from './ui/button'

const LINKS = [
  { label: 'Design your ball', to: '/design' },
  { label: 'Shop by size', href: '#' },
  { label: 'Templates', href: '#styles' },
  { label: 'Team orders', href: '#team-orders' },
  { label: 'Gifts', href: '#' },
]

const mobileList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

const mobileItem = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
}

export function Logomark() {
  return (
    <motion.svg
      whileHover={{ rotate: 18 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden
    >
      <circle cx="13" cy="13" r="11.5" stroke="var(--accent)" strokeWidth="1.6" />
      <path d="M13 1.5v23M1.5 13h23" stroke="var(--accent)" strokeWidth="1.3" />
      <path
        d="M4 4.5c3.2 2.6 5 5.6 5 8.5s-1.8 5.9-5 8.5M22 4.5c-3.2 2.6-5 5.6-5 8.5s1.8 5.9 5 8.5"
        stroke="var(--accent)"
        strokeWidth="1.3"
      />
    </motion.svg>
  )
}

function AnnouncementBar() {
  return (
    <div className="w-full border-b border-white/10 bg-[var(--ink)] px-4 py-2 text-center text-[11px] font-medium tracking-wide text-white/75">
      <span className="hidden sm:inline">
        Free shipping over $50 <span className="mx-2 text-white/25">·</span> Use code{' '}
        <span className="font-semibold text-[var(--accent)]">FIRSTBALL</span> for 10% off your first design
      </span>
      <span className="sm:hidden">
        10% off your first design — code{' '}
        <span className="font-semibold text-[var(--accent)]">FIRSTBALL</span>
      </span>
    </div>
  )
}

function SearchIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden {...props}>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16l-3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function HeartIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden {...props}>
      <path
        d="M9 15.5s-6-3.8-6-8.1C3 4.9 4.8 3.3 7 3.3c1.1 0 2.1.6 2.6 1.4.5-.8 1.5-1.4 2.6-1.4 2.2 0 4 1.6 4 4.1 0 4.3-6 8.1-6 8.1z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function UserIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden {...props}>
      <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2.8 15.5c.9-3 3.2-4.6 6.2-4.6s5.3 1.6 6.2 4.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function BagIcon(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden {...props}>
      <path
        d="M4.5 6.2h9l.7 9.3a1 1 0 01-1 1.1H4.8a1 1 0 01-1-1.1l.7-9.3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M6.3 6.2V5a2.7 2.7 0 015.4 0v1.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function UtilityIcons() {
  const { count } = useCart()

  return (
    <div className="flex items-center gap-0.5 sm:gap-1">
      <Button asChild variant="ghost" size="icon" aria-label="Search">
        <a href="#">
          <SearchIcon />
        </a>
      </Button>
      <Button asChild variant="ghost" size="icon" aria-label="Wishlist" className="hidden sm:inline-flex">
        <a href="#">
          <HeartIcon />
        </a>
      </Button>
      <Button asChild variant="ghost" size="icon" aria-label="Account" className="hidden sm:inline-flex">
        <a href="#">
          <UserIcon />
        </a>
      </Button>
      <Button asChild variant="ghost" size="icon" aria-label={`Cart, ${count} items`}>
        <a href="#" className="relative">
          <BagIcon />
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)] text-[9px] font-bold leading-none text-white">
            {count}
          </span>
        </a>
      </Button>
    </div>
  )
}

function NavLink({ href, to, label, onClick, isHovered, onHoverStart, onHoverEnd }) {
  const className =
    'relative rounded-full px-4 py-2 text-sm font-medium text-white/75 transition-colors duration-200 hover:text-white'
  const pill = isHovered && (
    <motion.span
      layoutId="nav-hover-pill"
      className="absolute inset-0 -z-10 rounded-full bg-white/10"
      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
    />
  )

  if (to) {
    return (
      <Link to={to} onClick={onClick} onMouseEnter={onHoverStart} onMouseLeave={onHoverEnd} className={className}>
        {pill}
        {label}
      </Link>
    )
  }

  return (
    <a href={href} onClick={onClick} onMouseEnter={onHoverStart} onMouseLeave={onHoverEnd} className={className}>
      {pill}
      {label}
    </a>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="fixed inset-x-0 top-0 z-30">
      <AnnouncementBar />

      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-center px-4 pt-4"
      >
        <div
          className={`w-full max-w-[1180px] rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
            scrolled
              ? 'border-white/[0.12] bg-[var(--ink)]/75 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.65)]'
              : 'border-white/[0.07] bg-white/[0.035] shadow-[0_8px_30px_-16px_rgba(0,0,0,0.5)]'
          }`}
        >
          <div className="flex items-center justify-between gap-3 px-5 py-3">
            <Link to="/" className="flex shrink-0 items-center gap-2.5">
              <Logomark />
              <span className="font-[var(--font-display)] text-lg font-medium tracking-tight text-white">
                Build-A-Basketball
              </span>
            </Link>

            <nav
              className="hidden items-center gap-1 lg:flex"
              onMouseLeave={() => setHovered(null)}
            >
              {LINKS.map((l) => (
                <NavLink
                  key={l.label}
                  {...l}
                  isHovered={hovered === l.label}
                  onHoverStart={() => setHovered(l.label)}
                  onHoverEnd={() => {}}
                />
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <UtilityIcons />

              <Button asChild size="sm" className="hidden lg:inline-flex">
                <Link to="/design">Start Building</Link>
              </Button>

              <button
                type="button"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="relative flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
              >
                <motion.span
                  animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="h-[1.5px] w-5 origin-center bg-white"
                />
                <motion.span
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  className="h-[1.5px] w-5 bg-white"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="h-[1.5px] w-5 origin-center bg-white"
                />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden border-t border-white/[0.08] lg:hidden"
              >
                <motion.nav
                  variants={mobileList}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col gap-1 px-5 py-5"
                >
                  {LINKS.map((l) => (
                    <motion.div key={l.label} variants={mobileItem}>
                      {l.to ? (
                        <Link
                          to={l.to}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2.5 text-base font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <a
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2.5 text-base font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-white"
                        >
                          {l.label}
                        </a>
                      )}
                    </motion.div>
                  ))}
                  <motion.div variants={mobileItem} className="mt-2">
                    <Button asChild size="lg" className="w-full">
                      <Link to="/design" onClick={() => setOpen(false)}>
                        Start Building
                      </Link>
                    </Button>
                  </motion.div>
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </div>
  )
}

export default Navbar
