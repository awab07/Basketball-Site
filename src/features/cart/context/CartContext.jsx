import { useMemo, useState } from 'react'
import { CartContext } from './cartContext'

const SHIPPING_FLAT_RATE = 5

const DEFAULT_ITEMS = [
  {
    id: 'demo-ball-1',
    size: '7',
    color: '#FF5722',
    colorName: 'Classic Orange',
    label: 'YOUR NAME',
    hasLogo: true,
    printSides: 'Front and back printed',
    qty: 1,
    unitPrice: 38,
  },
  {
    id: 'demo-ball-2',
    size: '5',
    color: '#4169E1',
    colorName: 'Royal Blue',
    label: 'MIKE 23',
    hasLogo: false,
    printSides: 'Front printed',
    qty: 1,
    unitPrice: 25,
  },
]

let nextId = 1

export function CartProvider({ children }) {
  const [items, setItems] = useState(DEFAULT_ITEMS)

  const value = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0)
    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0)
    const shipping = items.length ? SHIPPING_FLAT_RATE : 0

    return {
      items,
      count,
      subtotal,
      shipping,
      addToCart(item, qty = 1) {
        setItems((prev) => [...prev, { ...item, qty, id: `cart-${Date.now()}-${nextId++}` }])
      },
      removeItem(id) {
        setItems((prev) => prev.filter((i) => i.id !== id))
      },
      setItemQty(id, qty) {
        setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)))
      },
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
