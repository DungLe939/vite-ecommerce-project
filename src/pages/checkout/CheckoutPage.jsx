import { useState, useEffect } from 'react';
import '../.././index.css'
import './checkout.css'
import CheckoutHeader from './CheckoutHeader';
import api from '../../api'
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

function CheckoutPage({ cart, loadCart }) {

    let countItems = 0;

    cart.forEach((item) => {
        countItems += item.quantity;
    })

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        const fetchCheckoutData = async () => {
            const resDelivery = await api.get("/api/delivery-options?expand=estimatedDeliveryTimeMs");
            setDeliveryOptions(resDelivery.data);
        }
        fetchCheckoutData();
    }, []);

    useEffect(() => {
        const fetchCheckoutData = async () => {
            const paymentDelivery = await api.get("/api/payment-summary");
            setPaymentSummary(paymentDelivery.data);
        }
        fetchCheckoutData();
    }, [cart]);

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
            <CheckoutHeader countItems={countItems} />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>
                <div className="checkout-grid">
                    <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart} />
                    {paymentSummary &&
                        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} cart={cart} deliveryOptions={deliveryOptions} />
                    }
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;