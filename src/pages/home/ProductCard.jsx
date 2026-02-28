import api from "../../api";
import { useState } from "react";

export function ProductCard({ product, loadCart, addToast }) {

    const [quantity, setQuantity] = useState(1);
    const { id, image, name, rating, priceCents } = product;
    const [isAdding, setIsAdding] = useState(false);

    return (
        <div className="product-container">
            <div className="product-image-container">
                {/* [web-design-guidelines: images need alt] */}
                <img className="product-image" src={image} alt={name} loading="lazy" />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {name}
            </div>

            <div className="product-rating-container">
                <img
                    className="product-rating-stars"
                    src={`images/ratings/rating-${rating.stars * 10}.png`}
                    alt={`${rating.stars} stars`}
                />
                <div className="product-rating-count link-primary">
                    {rating.count}
                </div>
            </div>

            <div className="product-price">
                ${(priceCents / 100).toFixed(2)}
            </div>

            <div className="product-quantity-container">
                {/* [web-design-guidelines: label for form controls] */}
                <label htmlFor={`qty-${id}`} className="sr-only">Quantity</label>
                <select
                    id={`qty-${id}`}
                    value={quantity}
                    onChange={(e) => { setQuantity(Number(e.target.value)) }}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart" style={{ opacity: isAdding ? 1 : 0 }}>
                <img src="images/icons/checkmark.png" alt="" aria-hidden="true" />
                Added
            </div>

            <button
                className="add-to-cart-button button-primary"
                disabled={isAdding}
                onClick={() => {
                    setIsAdding(true);
                    if (addToast) addToast(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart`);
                    setTimeout(() => {
                        setIsAdding(false);
                    }, 2000);
                    api.post('/api/cart-item', {
                        productId: id,
                        quantity: quantity,
                        deliveryOptionId: 1
                    }).then(() => loadCart());
                }}
            >
                Add to Cart
            </button>
        </div>
    );
}