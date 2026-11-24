import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

function RightPanel({ price, qty, onQtyChange, onAddToCart, addedFlash }) {
  return (
    <Card>
      <CardHeader className="flex-col items-start gap-1">
        <CardTitle>Your Price</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-1.5 text-sm">
          {price.lines.map((line) => (
            <li key={line.label} className="flex items-center justify-between text-[var(--ink)]/65">
              <span>{line.label}</span>
              <span>${line.amount}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between border-t border-[var(--ink)]/10 pt-3 text-xl font-semibold text-[var(--ink)]">
          <span>Total</span>
          <span>${price.total}</span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm text-[var(--ink)]/65">Quantity</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onQtyChange(Math.max(1, qty - 1))}
              aria-label="Decrease quantity"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--ink)]/15 text-[var(--ink)]/70 transition-colors hover:border-[var(--ink)]/30 hover:text-[var(--ink)]"
            >
              −
            </button>
            <span className="w-6 text-center text-sm font-semibold text-[var(--ink)]">{qty}</span>
            <button
              type="button"
              onClick={() => onQtyChange(qty + 1)}
              aria-label="Increase quantity"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--ink)]/15 text-[var(--ink)]/70 transition-colors hover:border-[var(--ink)]/30 hover:text-[var(--ink)]"
            >
              +
            </button>
          </div>
        </div>

        <Button type="button" size="lg" className="mt-5 w-full" onClick={onAddToCart}>
          {addedFlash ? 'Added ✓' : `Add to cart · $${price.total}`}
        </Button>
      </CardContent>
    </Card>
  )
}

export default RightPanel
