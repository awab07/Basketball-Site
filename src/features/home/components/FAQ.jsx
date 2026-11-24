import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

const FAQS = [
  {
    q: 'How long does it take to ship?',
    a: 'Most orders print and ship within 5 business days. Rush options are available at checkout.',
  },
  {
    q: 'Can I upload my own logo or artwork?',
    a: 'Yes — the live editor supports custom text, numbers, and uploaded artwork on select panels.',
  },
  {
    q: 'What sizes do you offer?',
    a: "Size 7 (official), Size 6 (women's / youth), Size 5 (junior), and a mini display size.",
  },
  {
    q: 'Do you offer discounts for team orders?',
    a: 'Yes — tiered discounts kick in at 10+, 25+, and 50+ balls, plus free design help for team orders.',
  },
  {
    q: "What's your return policy?",
    a: "Every ball is custom-printed to order, so we can't accept general returns — but misprints and defects are covered by our reprint guarantee.",
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Visa, Mastercard, cash on delivery, and wallet payments.',
  },
]

function ChevronIcon({ open }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      aria-hidden
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-[var(--ink)]/[0.08] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left text-[var(--ink)]"
      >
        <span className="text-[15px] font-medium">{item.q}</span>
        <span className="text-[var(--ink)]/50">
          <ChevronIcon open={open} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pr-8 pb-5 text-sm leading-relaxed text-[var(--ink)]/60">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="bg-[var(--studio-bg)] py-20 text-[var(--ink)]">
      <div className="mx-auto max-w-[760px] px-6">
        <h2 className="font-[var(--font-display)] text-[clamp(26px,3.4vw,34px)] font-semibold tracking-tight text-[var(--ink)]">
          Frequently asked questions
        </h2>
        <p className="mt-2 text-sm text-[var(--ink)]/60">Everything you need to know before you order.</p>

        <div className="mt-8 rounded-[20px] border border-[var(--ink)]/[0.08] bg-[var(--studio-panel)] px-6">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
