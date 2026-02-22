import './App.css'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import { Route, Routes } from 'react-router'
import OrdersPages from './pages/OdersPage'
import TrackingPage from './pages/TrackingPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/orders' element={<OrdersPages />} />
        <Route path='/tracking' element={<TrackingPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
