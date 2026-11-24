import { cn } from '@/shared/lib/utils'

function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-[22px] border border-[var(--ink)]/[0.08] bg-[var(--studio-panel)] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset] transition-colors duration-200 hover:border-[var(--ink)]/[0.16]',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }) {
  return <div className={cn('mb-5 flex flex-wrap items-center gap-2.5', className)} {...props} />
}

function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn('text-sm font-semibold uppercase tracking-[2px] text-[var(--ink)]/80', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }) {
  return <div className={cn(className)} {...props} />
}

export { Card, CardHeader, CardTitle, CardContent }
