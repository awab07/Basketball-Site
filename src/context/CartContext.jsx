import { useMemo, useState } from 'react'
import { CartContext } from './cartContext'

export function CartProvider({ children }) {
  const [count, setCount] = useState(2)

  const value = useMemo(
    () => ({
      count,
      addToCart(qty = 1) {
        setCount((c) => c + qty)
      },
    }),
    [count],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
