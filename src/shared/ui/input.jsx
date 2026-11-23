import { cn } from '@/shared/lib/utils'

function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'flex h-[52px] w-full rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-base font-medium text-white placeholder:text-white/35 outline-none transition-all duration-200 focus:border-[var(--accent)] focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(255,87,34,0.15)]',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
