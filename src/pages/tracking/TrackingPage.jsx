import './tracking.css'
import '../.././index.css'
import Header from '../../components/Header';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

function TrackingPage({ cart }) {

    const params = useParams();
    const { orderId, productId } = params;

    const [trackingOrder, setTrackingOrder] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setTrackingOrder(response.data);
        }
        fetchData();
    }, [orderId]);

    const trackingProduct = trackingOrder?.products?.find(
        (item) => item.productId === productId
    );

    const totalDeliveryTimeMs = (trackingProduct?.estimatedDeliveryTimeMs ?? 0) - (trackingOrder?.orderTimeMs ?? 0);
    //const timePassedMs = dayjs().valueOf() - trackingOrder.orderTimeMs;
    const timePassedMs = totalDeliveryTimeMs * 0.3;
    let deliveryPercent = totalDeliveryTimeMs ? (timePassedMs / totalDeliveryTimeMs) * 100 : 0;
    if (deliveryPercent > 100) {
        deliveryPercent = 100;
    }

    const isPreparing = deliveryPercent < 33;
    const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
    const isDelivered = deliveryPercent === 100;

    return (
        <>
            <title>Tracking</title>
            <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <a className="back-to-orders-link link-primary" href="/orders">
                        View all orders
                    </a>

                    {trackingProduct && (
                        <>
                            <div className="delivery-date">
                                {deliveryPercent === 100 ? "Delivered on" : "Arriving on"} {dayjs(trackingProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                            </div>

                            <div className="product-info">
                                {trackingProduct.product.name}
                            </div>

                            <div className="product-info">
                                Quantity: {trackingProduct.quantity}
                            </div>

                            <img className="product-image" src={`${trackingProduct.product.image}`} />
                        </>
                    )}

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing ? 'current-status' : ''}`} >
                            Preparing
                        </div>
                        <div className={`progress-label ${isShipped ? 'current-status' : ''}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${isDelivered ? 'current-status' : ''}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div
                            className="progress-bar"
                            style={{width: `${deliveryPercent}%`}}
                        ></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TrackingPage;