import Header from '../../components/Header';
import './HomePage.css'
import api from '../../api'
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductGrid';
import { useSearchParams } from 'react-router';

function HomePage({ cart, loadCart }) {

    const [searchparams] = useSearchParams();
    const search = searchparams.get('search');


    const [products, setProducts] = useState([]);


    useEffect(() => {
        const getHomeData = async () => {
            const url = search
                ? `/api/products?search=${search}`
                : "/api/products";
            const response = await api.get(url);
            setProducts(response.data || []);
        };
        getHomeData();
    }, [search]);

    return (
        <div>
            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} />
            </div>
        </div>
    );
}

export default HomePage;