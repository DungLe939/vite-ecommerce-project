import api from "../../api";
import { useState } from "react";

export function CartItemDetail({ product, quantity, loadCart, deliveryOptionId }) {

    const [isEditing, setIsEditing] = useState(false);
    const [newQuantity, setNewQuantity] = useState(quantity);

    const deleteCartItem = async () => {
        await api.delete(`/api/cart-items/${product.id}`);
        await loadCart();
    }

    const updateCartItem = async () => {
        await api.put(`/api/cart-items/${product.id}`, {
            quantity: Number(newQuantity),
            deliveryOptionId: deliveryOptionId,
        });
        await loadCart();
        setIsEditing(false);
    }

    return (
        <>
            <img className="product-image" src={`${product.image}`} />

            <div className="cart-item-details">
                <div className="product-name">
                    {product.name}
                </div>
                <div className="product-price">
                    ${(product.priceCents / 100).toFixed(2)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity:
                        {isEditing && (
                            <input
                                className="quantity-input"
                                type="text"
                                value={newQuantity}
                                onChange={(e) => setNewQuantity(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        updateCartItem();
                                    }
                                }}
                            />
                        )}
                        <span className="quantity-label">{quantity}</span>
                    </span>
                    <span
                        className="update-quantity-link link-primary"
                        onClick={() => {
                            if (isEditing) {
                                updateCartItem();
                            } else {
                                setIsEditing(true);
                            }
                        }}
                    >
                        {isEditing ? "Save" : "Update"}
                    </span>
                    <span
                        className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}
                    >
                        Delete
                    </span>
                </div>
            </div>

        </>
    );
}