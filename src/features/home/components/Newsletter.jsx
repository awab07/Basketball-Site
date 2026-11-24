import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  return (
    <section className="bg-[var(--studio-bg)] py-20 text-[var(--ink)]">
      <div className="mx-auto max-w-[720px] px-6">
        <div className="rounded-[28px] border border-[var(--ink)]/[0.08] bg-[var(--studio-panel)] px-6 py-12 text-center sm:px-12">
          <h2 className="font-[var(--font-display)] text-[clamp(24px,3.2vw,32px)] font-semibold tracking-tight text-[var(--ink)]">
            Get <span className="text-[var(--accent)]">10% off</span> your first design
          </h2>
          <p className="mt-2 text-sm text-[var(--ink)]/60">New templates and drops, straight to your inbox.</p>

          {submitted ? (
            <p className="mt-7 text-sm font-semibold text-[var(--accent)]">
              You&apos;re in — check your inbox for the code.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-7 flex max-w-[420px] flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                aria-label="Email address"
                className="sm:flex-1"
              />
              <Button type="submit" size="lg" className="sm:shrink-0">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Newsletter
