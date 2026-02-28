import { useState, useEffect } from 'react';
import '../.././index.css'
import './checkout.css'
import CheckoutHeader from './CheckoutHeader';
import api from '../../api'
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import { CartItemSkeleton } from '../../components/LoadingSkeleton';
import { EmptyState } from '../../components/EmptyState';
import { useNavigate } from 'react-router';

function CheckoutPage({ cart, loadCart, addToast }) {

    const navigate = useNavigate();

    // [rerender-derived-state-no-effect] derive countItems during render
    let countItems = 0;
    for (const item of cart) {
        countItems += item.quantity;
    }

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);
    const [isLoadingDelivery, setIsLoadingDelivery] = useState(true);

    // [async-parallel] Fetch delivery options and payment summary in parallel
    useEffect(() => {
        const fetchCheckoutData = async () => {
            setIsLoadingDelivery(true);
            const [resDelivery, resPayment] = await Promise.all([
                api.get("/api/delivery-options?expand=estimatedDeliveryTimeMs"),
                api.get("/api/payment-summary"),
            ]);
            setDeliveryOptions(resDelivery.data);
            setPaymentSummary(resPayment.data);
            setIsLoadingDelivery(false);
        }
        fetchCheckoutData();
    }, []);

    // Re-fetch payment summary when cart changes
    useEffect(() => {
        if (!isLoadingDelivery) {
            api.get("/api/payment-summary")
                .then(res => setPaymentSummary(res.data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);

    // [web-design-guidelines: empty states — don't render broken UI]
    if (!isLoadingDelivery && cart.length === 0) {
        return (
            <>
                <title>Checkout</title>
                <CheckoutHeader countItems={0} />
                <div className="checkout-page">
                    <EmptyState
                        icon="🛒"
                        title="Your cart is empty"
                        message="Looks like you haven't added anything yet. Browse our products and find something you love!"
                        actionText="Continue Shopping"
                        onAction={() => navigate('/')}
                    />
                </div>
            </>
        );
    }

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
            <CheckoutHeader countItems={countItems} />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>
                <div className="checkout-grid">
                    {isLoadingDelivery ? (
                        <div className="order-summary">
                            {Array.from({ length: Math.max(cart.length, 2) }).map((_, i) => (
                                <CartItemSkeleton key={i} />
                            ))}
                        </div>
                    ) : (
                        <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart} addToast={addToast} />
                    )}
                    {paymentSummary != null ? (
                        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} cart={cart} deliveryOptions={deliveryOptions} addToast={addToast} />
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;