import api from "../../api";
import { formatMoney } from "../../utils/money";
import { useNavigate } from "react-router";
import { useState } from "react";

export function PaymentSummary({ paymentSummary, loadCart, cart, deliveryOptions, addToast }) {

    const navigate = useNavigate();
    const [isPlacing, setIsPlacing] = useState(false);

    const createOrder = async () => {
        setIsPlacing(true);
        try {
            const product = cart.map((item) => {
                const deliveryOption = deliveryOptions.find(
                    (option) => option.id === item.deliveryOptionId
                );
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    estimatedDeliveryTimeMs: deliveryOption
                        ? deliveryOption.estimatedDeliveryTimeMs
                        : null,
                };
            });

            await api.post('/api/orders', {
                orderTimeMs: Date.now(),
                totalCostCents: paymentSummary.totalCostCents,
                product,
            });
            await loadCart();
            if (addToast) addToast('Order placed successfully!');
            navigate('/orders');
        } catch {
            if (addToast) addToast('Failed to place order', 'error');
            setIsPlacing(false);
        }
    }

    return (
        <div className="payment-summary">
            <div className="payment-summary-title">
                Payment Summary
            </div>
            <div className="payment-summary-row">
                <div>Items ({paymentSummary.totalItems}):</div>
                {/* [web-design-guidelines: font-variant-numeric: tabular-nums for numbers] */}
                <div className="payment-summary-money">${formatMoney(paymentSummary.productCostCents)}</div>
            </div>

            <div className="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">${formatMoney(paymentSummary.shippingCostCents)}</div>
            </div>

            <div className="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div className="payment-summary-money">${formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
            </div>

            <div className="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div className="payment-summary-money">${formatMoney(paymentSummary.taxCents)}</div>
            </div>

            <div className="payment-summary-row total-row">
                <div>Order total:</div>
                <div className="payment-summary-money">${formatMoney(paymentSummary.totalCostCents)}</div>
            </div>

            <button
                className="place-order-button button-primary"
                onClick={createOrder}
                disabled={isPlacing}
                style={isPlacing ? { opacity: 0.7, cursor: 'wait' } : {}}
            >
                {/* [web-design-guidelines: Loading… with ellipsis] */}
                {isPlacing ? "Placing order…" : "Place your order"}
            </button>
        </div>
    );
}