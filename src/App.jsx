import './App.css'
import CheckoutPage from './pages/checkout/CheckoutPage'
import HomePage from './pages/home/HomePage'
import { Route, Routes, useLocation } from 'react-router'
import OrdersPages from './pages/order/OdersPage'
import TrackingPage from './pages/tracking/TrackingPage'
import NotFoundPage from './pages/notfound/NotFoundPage'
import api from './api'
import { useCallback, useEffect, useState } from 'react'
import { ResetButton } from './components/ResetButton'
import { ToastProvider } from './components/Toast'

// [web-design-guidelines: scroll to top on navigation]
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = useCallback(async () => {
    const response = await api.get("/api/cart-items?expand=product");
    setCart(response.data || []);
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return (
    <ToastProvider>
      {(addToast) => (
        <>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<HomePage cart={cart} loadCart={loadCart} addToast={addToast} />} />
            <Route path='/checkout' element={<CheckoutPage cart={cart} loadCart={loadCart} addToast={addToast} />} />
            <Route path='/orders' element={<OrdersPages cart={cart} loadCart={loadCart} addToast={addToast} />} />
            <Route path='/tracking/:orderId/:productId' element={<TrackingPage cart={cart} />} />
            <Route path='*' element={<NotFoundPage cart={cart} />} />
          </Routes>
          <ResetButton loadCart={loadCart} />
        </>
      )}
    </ToastProvider>
  )
}

export default App
