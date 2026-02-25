import dayjs from "dayjs";
import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemDetail } from "./CartItemDetail";

export function OrderSummary({ deliveryOptions, cart }) {
    return (
        <div className="order-summary">

            {deliveryOptions.length > 0 && cart.map((item) => {
                const { productId, quantity, product, deliveryOptionId } = item;
                const selectedDeliveryOption = deliveryOptions
                    .find((deliveryOption) => {
                        return deliveryOption.id === deliveryOptionId;
                    });
                return (
                    <div key={productId} className="cart-item-container">
                        <div className="delivery-date">
                            Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                        </div>

                        <div className="cart-item-details-grid">
                            <CartItemDetail quantity={quantity} product={product} />
                            <DeliveryOptions
                                deliveryOptions={deliveryOptions}
                                deliveryOptionId={deliveryOptionId}
                                productId={productId}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}