import { Card } from './ui/card'

const STEPS = [
  { n: 1, title: 'Choose ball', text: 'Pick size and base color.' },
  { n: 2, title: 'Add name and logo', text: 'Text, numbers, uploads, clipart.' },
  { n: 3, title: 'Preview in 3D', text: 'Rotate and check every panel.' },
  { n: 4, title: 'Order and track', text: 'Fast print and delivery.' },
]

function StepCard({ step }) {
  return (
    <Card className="flex flex-col gap-4 p-6 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">
        {step.n}
      </span>
      <div>
        <h3 className="text-base font-semibold text-white">{step.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/55">{step.text}</p>
      </div>
    </Card>
  )
}

function HowItWorks() {
  return (
    <section id="how" className="bg-[var(--ink)] py-20 text-white">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="mb-10 font-[var(--font-display)] text-[clamp(26px,3.4vw,34px)] font-semibold tracking-tight text-white">
          How it works
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <StepCard key={step.n} step={step} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
