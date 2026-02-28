import './LoadingSkeleton.css';

export function ProductCardSkeleton() {
    return (
        <div className="skeleton-product-card">
            <div className="skeleton skeleton-product-image"></div>
            <div className="skeleton skeleton-product-name"></div>
            <div className="skeleton skeleton-product-name-2"></div>
            <div className="skeleton skeleton-product-rating"></div>
            <div className="skeleton skeleton-product-price"></div>
            <div className="skeleton skeleton-product-select"></div>
            <div className="skeleton-product-spacer"></div>
            <div className="skeleton skeleton-product-button"></div>
        </div>
    );
}

export function CartItemSkeleton() {
    return (
        <div className="skeleton-cart-item">
            <div className="skeleton skeleton-cart-delivery"></div>
            <div className="skeleton-cart-grid">
                <div className="skeleton skeleton-cart-image"></div>
                <div>
                    <div className="skeleton skeleton-cart-name"></div>
                    <div className="skeleton skeleton-cart-price"></div>
                    <div className="skeleton skeleton-cart-actions"></div>
                </div>
            </div>
        </div>
    );
}

export function OrderSkeleton() {
    return (
        <div className="skeleton-order">
            <div className="skeleton-order-header">
                <div>
                    <div className="skeleton skeleton-order-label"></div>
                    <div className="skeleton skeleton-order-value"></div>
                </div>
                <div>
                    <div className="skeleton skeleton-order-label"></div>
                    <div className="skeleton skeleton-order-value"></div>
                </div>
                <div>
                    <div className="skeleton skeleton-order-label"></div>
                    <div className="skeleton skeleton-order-id"></div>
                </div>
            </div>
            <div className="skeleton-order-body">
                <div className="skeleton skeleton-order-img"></div>
                <div>
                    <div className="skeleton skeleton-order-product-name"></div>
                    <div className="skeleton skeleton-order-product-date"></div>
                    <div className="skeleton skeleton-order-product-qty"></div>
                </div>
                <div className="skeleton skeleton-order-btn"></div>
            </div>
        </div>
    );
}
