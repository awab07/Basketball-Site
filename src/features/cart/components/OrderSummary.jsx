import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

const PROMO_CODE = 'FIRSTBALL'
const PROMO_RATE = 0.1

function OrderSummary({ subtotal, shipping, approved, onApprovedChange, onPlaceOrder, placed }) {
  const [promo, setPromo] = useState('')
  const [discountRate, setDiscountRate] = useState(0)
  const [promoMessage, setPromoMessage] = useState('')

  const discount = Math.round(subtotal * discountRate)
  const total = Math.max(0, subtotal + shipping - discount)

  function applyPromo() {
    if (promo.trim().toUpperCase() === PROMO_CODE) {
      setDiscountRate(PROMO_RATE)
      setPromoMessage('10% off applied')
    } else {
      setDiscountRate(0)
      setPromoMessage(promo.trim() ? 'Invalid code' : '')
    }
  }

  return (
    <div className="flex flex-col gap-5 rounded-[22px] border border-[var(--ink)]/[0.08] bg-[var(--studio-panel)] p-6">
      <h3 className="text-sm font-semibold uppercase tracking-[2px] text-[var(--ink)]/80">Order summary</h3>

      <ul className="flex flex-col gap-2 text-sm">
        <li className="flex items-center justify-between text-[var(--ink)]/65">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </li>
        <li className="flex items-center justify-between text-[var(--ink)]/65">
          <span>Shipping</span>
          <span>${shipping}</span>
        </li>
        <li className="flex items-center justify-between text-[var(--ink)]/65">
          <span>Discount</span>
          <span>{discount ? `− $${discount}` : '− $0'}</span>
        </li>
      </ul>

      <div>
        <div className="flex gap-2">
          <Input
            placeholder="Promo code"
            aria-label="Promo code"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            className="h-11 text-sm"
          />
          <Button type="button" variant="outline" size="sm" onClick={applyPromo} className="h-11 shrink-0">
            Apply
          </Button>
        </div>
        {promoMessage && (
          <p className={`mt-2 text-xs font-medium ${discountRate ? 'text-emerald-400' : 'text-red-400'}`}>
            {promoMessage}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-[var(--ink)]/10 pt-4 text-base font-semibold text-[var(--ink)]">
        <span>Total</span>
        <span>${total}</span>
      </div>

      <label className="flex items-start gap-2.5 text-sm text-[var(--ink)]/75">
        <input
          type="checkbox"
          checked={approved}
          onChange={(e) => onApprovedChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--ink)]/30 bg-white accent-[var(--accent)]"
        />
        I have checked and approved my design
      </label>

      <Button type="button" size="lg" className="w-full" disabled={!approved} onClick={onPlaceOrder}>
        {placed ? 'Order placed ✓' : `Place order · $${total}`}
      </Button>

      <p className="text-center text-xs text-[var(--ink)]/40">Secure payment · Free reprint if we get it wrong</p>
    </div>
  )
}

export default OrderSummary
