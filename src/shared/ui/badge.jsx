import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[1.5px] whitespace-nowrap',
  {
    variants: {
      variant: {
        default: 'border-white/15 bg-white/[0.06] text-white/80',
        accent: 'border-[var(--accent)]/40 bg-[var(--accent)]/15 text-[var(--accent)]',
        live: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />
}

export { Badge }
