import api from '../../api';
import { formatDay } from '../../utils/formatDay';
import { formatMoney } from '../../utils/money';
import { Fragment, useState } from 'react';

export function OrdersGrid({ orders, loadCart, addToast, setOrders }) {

    const [addingProductId, setAddingProductId] = useState(null);
    const [deletingOrderId, setDeletingOrderId] = useState(null);

    const deleteOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) {
            return;
        }
        setDeletingOrderId(orderId);
        try {
            await api.delete(`/api/orders/${orderId}`);
            if (addToast) addToast('Order canceled successfully');
            if (setOrders) {
                setOrders(prev => prev.filter(o => o.id !== orderId));
            }
        } catch {
            if (addToast) addToast('Failed to cancel order', 'error');
        }
        setDeletingOrderId(null);
    }

    const addToCart = async (productId) => {
        setAddingProductId(productId);
        try {
            await api.post('/api/cart-item', {
                productId: productId,
                quantity: 1,
                deliveryOptionId: "1"
            });
            await loadCart();
            if (addToast) addToast('Added to cart');
        } catch {
            if (addToast) addToast('Failed to add to cart', 'error');
        }
        setAddingProductId(null);
    }

    return (
        <div className="orders-grid">
            {orders && orders.map((order) => {
                return (
                    <div key={order.id} className="order-container">

                        <div className="order-header">
                            <div className="order-header-left-section">
                                <div className="order-date">
                                    <div className="order-header-label">Order Placed:</div>
                                    <div>{formatDay(order.orderTimeMs)}</div>
                                </div>
                                <div className="order-total">
                                    <div className="order-header-label">Total:</div>
                                    <div>${formatMoney(order.totalCostCents)}</div>
                                </div>
                            </div>

                            <div className="order-header-right-section">
                                <div className="order-header-id-group">
                                    <div className="order-header-label">Order ID:</div>
                                    <div>{order.id}</div>
                                </div>
                                <button
                                    className="cancel-order-button"
                                    onClick={() => deleteOrder(order.id)}
                                    disabled={deletingOrderId === order.id}
                                    style={deletingOrderId === order.id ? { opacity: 0.6, cursor: 'wait' } : {}}
                                >
                                    {deletingOrderId === order.id ? "Canceling…" : "Cancel Order"}
                                </button>
                            </div>
                        </div>

                        <div className="order-details-grid">
                            {order.products && order.products.map((orderProduct) => {
                                const isAdding = addingProductId === orderProduct.product.id;
                                return (
                                    <Fragment key={orderProduct.product.id}>
                                        <div className="product-image-container">
                                            {/* [web-design-guidelines: images need alt] */}
                                            <img src={orderProduct.product.image} alt={orderProduct.product.name} />
                                        </div>

                                        <div className="product-details">
                                            <div className="product-name">
                                                {orderProduct.product.name}
                                            </div>
                                            <div className="product-delivery-date">
                                                Arriving on: {formatDay(orderProduct.product.estimatedDeliveryTimeMs)}
                                            </div>
                                            <div className="product-quantity">
                                                Quantity: {orderProduct.quantity}
                                            </div>
                                            <button
                                                className="buy-again-button button-primary"
                                                onClick={() => { addToCart(orderProduct.product.id) }}
                                                disabled={isAdding}
                                                style={isAdding ? { opacity: 0.7, cursor: 'wait' } : {}}
                                                aria-label={`Add ${orderProduct.product.name} to cart`}
                                            >
                                                {/* [web-design-guidelines: images need alt, decorative icons aria-hidden] */}
                                                <img className="buy-again-icon" src="images/icons/buy-again.png" alt="" aria-hidden="true" />
                                                <span className="buy-again-message">
                                                    {isAdding ? "Adding…" : "Add to Cart"}
                                                </span>
                                            </button>
                                        </div>

                                        <div className="product-actions">
                                            {/* [web-design-guidelines: use <a> for navigation] */}
                                            <a href={`/tracking/${order.id}/${orderProduct.product.id}`}>
                                                <button className="track-package-button button-secondary">
                                                    Track package
                                                </button>
                                            </a>
                                        </div>
                                    </Fragment>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}