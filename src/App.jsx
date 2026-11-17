import { Route, Routes } from 'react-router-dom'
import CartPage from './pages/CartPage'
import DesignEditor from './pages/DesignEditor'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/design" element={<DesignEditor />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  )
}

export default App
