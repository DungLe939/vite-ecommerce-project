import './orders.css'
import '../.././index.css'
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import api from '../../api'
import { OrdersGrid } from './OrdersGrid';
import { OrderSkeleton } from '../../components/LoadingSkeleton';
import { EmptyState } from '../../components/EmptyState';
import { useNavigate } from 'react-router';

function OrdersPages({ cart, loadCart, addToast }) {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await api.get("/api/orders?expand=products");
            setOrders(response.data || []);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return (
        <>
            <title>Orders</title>
            <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
            <Header cart={cart} />
            <div className="orders-page">
                <div className="page-title">Your Orders</div>
                {isLoading ? (
                    <>
                        <OrderSkeleton />
                        <OrderSkeleton />
                    </>
                ) : orders.length === 0 ? (
                    /* [web-design-guidelines: empty states] */
                    <EmptyState
                        icon="📦"
                        title="No orders yet"
                        message="When you place an order, it will appear here. Start shopping to find products you love!"
                        actionText="Start Shopping"
                        onAction={() => navigate('/')}
                    />
                ) : (
                    <OrdersGrid orders={orders} loadCart={loadCart} addToast={addToast} setOrders={setOrders} />
                )}
            </div>
        </>
    );
}

export default OrdersPages;
