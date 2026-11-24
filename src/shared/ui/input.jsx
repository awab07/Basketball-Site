import { cn } from '@/shared/lib/utils'

function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        'flex h-[52px] w-full rounded-xl border border-[var(--ink)]/[0.14] bg-[var(--studio-panel)] px-4 py-3 text-base font-medium text-[var(--ink)] placeholder:text-[var(--ink)]/35 outline-none transition-all duration-200 focus:border-[var(--accent)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,87,34,0.15)]',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
