import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "../../components/LoadingSkeleton";

export function ProductsGrid({ products, loadCart, isLoading, addToast }) {

    if (isLoading) {
        return (
            <div className="products-grid">
                {Array.from({ length: 12 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className="products-grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} loadCart={loadCart} addToast={addToast} />
            ))}
        </div>
    );
}