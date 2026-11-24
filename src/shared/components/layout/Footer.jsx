import { Link } from 'react-router-dom'
import { Logomark } from './Navbar'

const COLUMNS = [
  {
    heading: 'Shop',
    links: [
      { label: 'Design your ball', to: '/design' },
    ],
  },
  {
    heading: 'Help',
    links: [
      { label: 'Track order', href: '#' },
      { label: 'Shipping', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Contact us', href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About us', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Privacy policy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
]

const SOCIALS = ['Instagram', 'Facebook', 'TikTok', 'YouTube']
const PAYMENTS = ['Visa', 'Mastercard', 'Cash on delivery', 'Wallet']

function Footer() {
  return (
    <footer className="bg-[var(--studio-bg)] text-[var(--ink)]">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <Logomark />
              <span className="font-[var(--font-display)] text-lg font-medium tracking-tight text-[var(--ink)]">
                Build-A-Basketball
              </span>
            </Link>
            <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-[var(--ink)]/55">
              Custom basketballs, built by you.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[var(--ink)]/55">
              {SOCIALS.map((social) => (
                <a key={social} href="#" className="transition-colors hover:text-[var(--ink)]">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-[var(--ink)]">{col.heading}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link to={link.to} className="text-sm text-[var(--ink)]/55 transition-colors hover:text-[var(--ink)]">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="text-sm text-[var(--ink)]/55 transition-colors hover:text-[var(--ink)]">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 border-t border-[var(--ink)]/10 pt-6 text-xs text-[var(--ink)]/45 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Build-A-Basketball. All rights reserved.</span>
          <span>{PAYMENTS.join(' · ')}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
