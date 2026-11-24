import { Link } from 'react-router-dom'
import MiniBasketball from '@/shared/components/ball-viewer/MiniBasketball'
import { Card } from '@/shared/ui/card'

function CartItemRow({ item, onQtyChange, onRemove }) {
  const title = `Size ${item.size} · "${item.label}"${item.hasLogo ? ' + logo' : ''}`

  return (
    <Card className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
      <MiniBasketball
        hex={item.color}
        label={item.hasLogo ? '' : item.label}
        size="h-16 w-16 shrink-0 sm:h-20 sm:w-20"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-[var(--ink)] sm:text-[15px]">{title}</p>
        <p className="mt-1 text-xs text-[var(--ink)]/55">
          {item.colorName} · {item.printSides}
        </p>
        <Link
          to={`/design?color=${encodeURIComponent(item.color)}`}
          className="mt-1.5 inline-block text-xs font-semibold text-[var(--accent)] hover:underline"
        >
          Edit design
        </Link>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center sm:gap-2.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onQtyChange(item.qty - 1)}
            aria-label="Decrease quantity"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--ink)]/15 text-[var(--ink)]/70 transition-colors hover:border-[var(--ink)]/30 hover:text-[var(--ink)]"
          >
            −
          </button>
          <span className="w-5 text-center text-sm font-semibold text-[var(--ink)]">{item.qty}</span>
          <button
            type="button"
            onClick={() => onQtyChange(item.qty + 1)}
            aria-label="Increase quantity"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--ink)]/15 text-[var(--ink)]/70 transition-colors hover:border-[var(--ink)]/30 hover:text-[var(--ink)]"
          >
            +
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[var(--ink)]">${item.unitPrice * item.qty}</span>
          <button
            type="button"
            onClick={onRemove}
            className="text-xs font-semibold text-[var(--ink)]/45 transition-colors hover:text-[var(--ink)]"
          >
            Remove
          </button>
        </div>
      </div>
    </Card>
  )
}

export default CartItemRow
