import { Route, Routes } from 'react-router-dom'
import DesignEditor from './pages/DesignEditor'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/design" element={<DesignEditor />} />
    </Routes>
  )
}

export default App
