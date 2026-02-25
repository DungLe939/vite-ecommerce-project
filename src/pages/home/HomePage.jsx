import Header from '../../components/Header';
import './HomePage.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductGrid';

function HomePage({ cart }) {

    const [products, setProducts] = useState([]);


    useEffect(() => {
        const getHomeData = async () => {
            const response = await axios.get("/api/products")
            setProducts(response.data);
        };
        getHomeData();
    }, []);

    return (
        <div>
            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
            <Header cart={cart} />

            <div className="home-page">
                <ProductsGrid products={products} />
            </div>
        </div>
    );
}

export default HomePage;