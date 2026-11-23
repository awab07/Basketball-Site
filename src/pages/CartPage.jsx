import { useState } from 'react'
import { Link } from 'react-router-dom'
import CartItemRow from '@/features/cart/components/CartItemRow'
import CheckoutTopBar from '@/features/cart/components/CheckoutTopBar'
import OrderSummary from '@/features/cart/components/OrderSummary'
import PaymentMethod from '@/features/cart/components/PaymentMethod'
import ShippingForm from '@/features/cart/components/ShippingForm'
import { useCart } from '@/features/cart/hooks/useCart'
import { Button } from '@/shared/ui/button'

function EmptyCart() {
  return (
    <div className="mx-auto flex max-w-[420px] flex-col items-center gap-4 py-24 text-center">
      <h2 className="font-[var(--font-display)] text-2xl text-white">Your cart is empty</h2>
      <p className="text-sm text-white/55">Design a ball and it&apos;ll show up here, ready for checkout.</p>
      <Button asChild size="lg">
        <Link to="/design">Start designing</Link>
      </Button>
    </div>
  )
}

function CartPage() {
  const { items, subtotal, shipping, removeItem, setItemQty } = useCart()
  const [shippingValues, setShippingValues] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  })
  const [method, setMethod] = useState('card')
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' })
  const [approved, setApproved] = useState(false)
  const [placed, setPlaced] = useState(false)

  function handleShippingChange(key, value) {
    setShippingValues((v) => ({ ...v, [key]: value }))
  }

  function handleCardChange(key, value) {
    setCard((c) => ({ ...c, [key]: value }))
  }

  function handlePlaceOrder() {
    if (!approved) return
    setPlaced(true)
  }

  const itemCount = items.reduce((n, i) => n + i.qty, 0)

  return (
    <div className="min-h-screen bg-[var(--ink)] text-white">
      <CheckoutTopBar activeStep={1} />

      <div className="mx-auto max-w-[1180px] px-4 py-10 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
            <div className="flex flex-col gap-10">
              <section>
                <h1 className="font-[var(--font-display)] text-2xl font-semibold tracking-tight">
                  Your cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                </h1>
                <div className="mt-5 flex flex-col gap-4">
                  {items.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onQtyChange={(qty) => setItemQty(item.id, qty)}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-sm font-semibold uppercase tracking-[2px] text-white/90">
                  Shipping details
                </h2>
                <div className="mt-4">
                  <ShippingForm values={shippingValues} onChange={handleShippingChange} />
                </div>
              </section>

              <section>
                <h2 className="text-sm font-semibold uppercase tracking-[2px] text-white/90">
                  Payment method
                </h2>
                <div className="mt-4">
                  <PaymentMethod method={method} onSelect={setMethod} card={card} onCardChange={handleCardChange} />
                </div>
              </section>
            </div>

            <div className="lg:sticky lg:top-6">
              <OrderSummary
                subtotal={subtotal}
                shipping={shipping}
                approved={approved}
                onApprovedChange={setApproved}
                onPlaceOrder={handlePlaceOrder}
                placed={placed}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
