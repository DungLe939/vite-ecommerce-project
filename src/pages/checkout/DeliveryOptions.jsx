import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";

export function DeliveryOptions({ deliveryOptions, deliveryOptionId, productId }) {
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {deliveryOptions.map((deliveryOption) => {
                return (
                    <div key={deliveryOption.id} className="delivery-option">
                        <input
                            type="radio"
                            checked={deliveryOptionId === deliveryOption.id}
                            className="delivery-option-input"
                            name={`delivery-option-${productId}`}
                        />
                        <div>
                            <div className="delivery-option-date">
                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                            </div>
                            <div className="delivery-option-price">
                                {deliveryOption.priceCents === 0 ? "FREE Shipping" : `$${formatMoney(deliveryOption.priceCents)}`}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}