import './App.css'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router'
import OrdersPages from './pages/OdersPage'
import TrackingPage from './pages/TrackingPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/orders' element={<OrdersPages />} />
        <Route path='/tracking' element={<TrackingPage />} />
      </Routes>
    </>
  )
}

export default App
