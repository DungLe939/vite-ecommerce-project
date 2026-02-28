import api from "../../api";
import { useState } from "react";

export function CartItemDetail({ product, quantity, loadCart, deliveryOptionId, addToast }) {

    const [isEditing, setIsEditing] = useState(false);
    const [newQuantity, setNewQuantity] = useState(quantity);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const deleteCartItem = async () => {
        // [web-design-guidelines: destructive actions need confirmation]
        if (!window.confirm(`Remove "${product.name}" from cart?`)) return;

        setIsDeleting(true);
        try {
            await api.delete(`/api/cart-items/${product.id}`);
            if (addToast) addToast('Item removed from cart');
            await loadCart();
        } catch {
            setIsDeleting(false);
        }
    }

    const updateCartItem = async () => {
        setIsSaving(true);
        try {
            await api.put(`/api/cart-items/${product.id}`, {
                quantity: Number(newQuantity),
                deliveryOptionId: deliveryOptionId,
            });
            if (addToast) addToast('Quantity updated');
            await loadCart();
            setIsEditing(false);
        } catch {
            // keep editing state on error
        }
        setIsSaving(false);
    }

    if (isDeleting) {
        return (
            <div className="cart-item-details" style={{ opacity: 0.5 }}>
                {/* [web-design-guidelines: Loading… with ellipsis] */}
                <div className="product-name" style={{ color: '#999' }}>Removing…</div>
            </div>
        );
    }

    return (
        <>
            {/* [web-design-guidelines: images need alt] */}
            <img className="product-image" src={`${product.image}`} alt={product.name} />

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
                        {isEditing ? (
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
                                disabled={isSaving}
                                aria-label="New quantity"
                            />
                        ) : null}
                        <span className="quantity-label">{quantity}</span>
                    </span>
                    <span
                        className="update-quantity-link link-primary"
                        style={isSaving ? { opacity: 0.5, pointerEvents: 'none' } : {}}
                        onClick={() => {
                            if (isEditing) {
                                updateCartItem();
                            } else {
                                setIsEditing(true);
                            }
                        }}
                    >
                        {/* [web-design-guidelines: Loading… with ellipsis] */}
                        {isSaving ? "Saving…" : isEditing ? "Save" : "Update"}
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