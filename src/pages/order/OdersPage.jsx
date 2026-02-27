import './orders.css'
import '../.././index.css'
import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import api from '../../api'
import { OrdersGrid } from './OrdersGrid';

function OrdersPages({ cart, loadCart }) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get("/api/orders?expand=products");
            setOrders(response.data);
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
                <OrdersGrid orders={orders} loadCart={loadCart} />
            </div>
        </>
    );
}

export default OrdersPages;
