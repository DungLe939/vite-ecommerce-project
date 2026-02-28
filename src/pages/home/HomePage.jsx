import Header from '../../components/Header';
import './HomePage.css'
import api from '../../api'
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductGrid';
import { useSearchParams } from 'react-router';

function HomePage({ cart, loadCart, addToast }) {

    const [searchparams] = useSearchParams();
    const search = searchparams.get('search');

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getHomeData = async () => {
            setIsLoading(true);
            const url = search
                ? `/api/products?search=${search}`
                : "/api/products";
            const response = await api.get(url);
            setProducts(response.data || []);
            setIsLoading(false);
        };
        getHomeData();
    }, [search]);

    return (
        <div>
            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} loadCart={loadCart} isLoading={isLoading} addToast={addToast} />
            </div>
        </div>
    );
}

export default HomePage;