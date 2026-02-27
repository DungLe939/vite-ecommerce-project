import api from '../../api';
import { formatDay } from '../../utils/formatDay';
import { formatMoney } from '../../utils/money';
import { Fragment } from 'react';

export function OrdersGrid({ orders, loadCart }) {

    const addToCart = async (productId) => {
        await api.post('/api/cart-item', {
            productId: productId,
            quantity: 1,
            deliveryOptionId: "1"
        })
        await loadCart();
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
                                <div className="order-header-label">Order ID:</div>
                                <div>{order.id}</div>
                            </div>
                        </div>

                        <div className="order-details-grid">
                            {order.products && order.products.map((orderProduct) => {
                                return (
                                    <Fragment key={orderProduct.product.id}>
                                        <div className="product-image-container">
                                            <img src={orderProduct.product.image} />
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
                                            >
                                                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                                <span className="buy-again-message">Add to Cart</span>
                                            </button>
                                        </div>

                                        <div className="product-actions">
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