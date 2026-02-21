import './App.css'
import CheckoutPage from './pages/CheckOut'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
      </Routes>
    </>
  )
}

export default App
