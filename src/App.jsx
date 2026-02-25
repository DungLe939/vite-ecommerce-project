import './App.css'
import CheckoutPage from './pages/checkout/CheckoutPage'
import HomePage from './pages/home/HomePage'
import { Route, Routes } from 'react-router'
import OrdersPages from './pages/order/OdersPage'
import TrackingPage from './pages/tracking/TrackingPage'
import NotFoundPage from './pages/notfound/NotFoundPage'
import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("/api/cart-items?expand=product")
      .then((response) => {
        setCart(response.data);
      })
  }, []);


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage cart={cart} />} />
        <Route path='/checkout' element={<CheckoutPage cart={cart} />} />
        <Route path='/orders' element={<OrdersPages cart={cart} />} />
        <Route path='/tracking' element={<TrackingPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
