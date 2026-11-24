import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--accent)] text-white hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(255,87,34,0.5)]',
        outline:
          'border border-[var(--ink)]/15 bg-[var(--ink)]/[0.03] text-[var(--ink)] hover:border-[var(--ink)]/30 hover:bg-[var(--ink)]/[0.06]',
        ghost: 'text-[var(--ink)]/70 hover:bg-[var(--ink)]/[0.06] hover:text-[var(--ink)]',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-8 text-base',
        icon: 'h-10 w-10 shrink-0',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button }
