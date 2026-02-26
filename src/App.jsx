import './App.css'
import CheckoutPage from './pages/checkout/CheckoutPage'
import HomePage from './pages/home/HomePage'
import { Route, Routes } from 'react-router'
import OrdersPages from './pages/order/OdersPage'
import TrackingPage from './pages/tracking/TrackingPage'
import NotFoundPage from './pages/notfound/NotFoundPage'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = useCallback(async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  }, []);

  useEffect(() => {
    axios.get("/api/cart-items?expand=product")
      .then(response => setCart(response.data));
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route path='/checkout' element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
        <Route path='/orders' element={<OrdersPages cart={cart} />} />
        <Route path='/tracking/:orderId/:productId' element={<TrackingPage cart={cart} />} />
        <Route path='*' element={<NotFoundPage cart={cart} />} />
      </Routes>
    </>
  )
}

export default App
