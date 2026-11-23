import { motion } from 'motion/react'
import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import BasketballStudio from '@/features/basketball-customizer/components/BasketballStudio'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Separator } from '@/shared/ui/separator'

const COLORS = [
  { name: 'Classic Orange', hex: '#FF5722' },
  { name: 'Midnight Black', hex: '#161616' },
  { name: 'Royal Blue', hex: '#4169E1' },
  { name: 'Championship Red', hex: '#C8102E' },
  { name: 'Forest Green', hex: '#1F4D36' },
  { name: 'Purple', hex: '#5B21B6' },
]

const NAME_LIMIT = 16

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

function ArrowIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LiveEditor() {
  const [color, setColor] = useState(COLORS[0])
  const [name, setName] = useState('')
  const nameId = useId()

  return (
    <section id="editor" className="relative overflow-hidden bg-[var(--ink)] py-24 text-white">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="relative mx-auto max-w-[1280px] px-6"
      >
        <motion.div variants={fadeUp} className="mx-auto mb-14 max-w-[620px] text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[2.5px] text-[var(--accent)]">
            Your personal basketball studio
          </p>
          <h2 className="font-[var(--font-display)] text-[clamp(30px,4.2vw,46px)] leading-[1.08] tracking-tight">
            Make It <span className="text-[var(--accent)]">Yours.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-base leading-relaxed text-white/60">
            Your basketball. Your colors. Your identity. Customize every
            detail and watch your creation come to life in real time.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 gap-6 rounded-[28px] border border-white/[0.12] bg-white/[0.045] p-4 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-6 lg:grid-cols-[1fr_1fr] lg:gap-8 lg:p-8"
        >
          <BasketballStudio color={color.hex} colorName={color.name} name={name} />

          <div className="flex flex-col gap-5">
            <Card>
              <CardHeader>
                <Badge variant="accent">Step 01</Badge>
                <CardTitle>Choose your color</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setColor(c)}
                      title={c.name}
                      aria-label={c.name}
                      aria-pressed={color.hex === c.hex}
                      className={`h-11 w-11 cursor-pointer rounded-full border-2 transition-all duration-200 ${
                        color.hex === c.hex
                          ? 'scale-110 border-white outline outline-2 outline-offset-2 outline-[var(--accent)]'
                          : 'border-white/20 hover:scale-110 hover:border-white/50'
                      }`}
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm font-semibold text-white">{color.name}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Badge variant="accent">Step 02</Badge>
                <CardTitle>Add your name or team</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  id={nameId}
                  type="text"
                  maxLength={NAME_LIMIT}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. BUCKETS"
                  aria-describedby={`${nameId}-count`}
                />
                <p id={`${nameId}-count`} className="mt-2 text-xs text-white/40">
                  {name.length} of {NAME_LIMIT} characters
                </p>
              </CardContent>
            </Card>

            <Separator />

            <Button asChild size="lg" className="w-full">
              <Link to="/design">
                Open Full Editor
                <ArrowIcon />
              </Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default LiveEditor
