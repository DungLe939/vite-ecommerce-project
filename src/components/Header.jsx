import { useState } from 'react';
import './Header.css'
import { NavLink, useNavigate, useSearchParams } from 'react-router';

function Header({ cart }) {
    let totalQuantity = 0;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    cart.forEach((element) => {
        totalQuantity += element.quantity;
    });

    const handleOnClick = () => {
        console.log(text)
        setText("");
        navigate(`/?search=${text}`);
    }

    const [text, setText] = useState(searchParams.get('search') || "");
    return (
        <>
            <div className="header">
                <div className="left-section">
                    <NavLink to="/" className="header-link">
                        <img className="logo" src="images/logo-white.png" />
                        <img className="mobile-logo" src="images/mobile-logo-white.png" />
                    </NavLink>
                </div>

                <div className="middle-section">
                    <input
                        className="search-bar"
                        type="text"
                        placeholder="Search"
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter')
                                handleOnClick();
                        }}
                    />

                    <button
                        className="search-button"
                        onClick={() => {
                            handleOnClick();
                        }}
                    >
                        <img className="search-icon" src="images/icons/search-icon.png" />
                    </button>
                </div>

                <div className="right-section">
                    <NavLink className="orders-link header-link" to="/orders">
                        <span className="orders-text">Orders</span>
                    </NavLink>

                    <NavLink className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src="images/icons/cart-icon.png" />
                        <div className="cart-quantity">{totalQuantity}</div>
                        <div className="cart-text">Cart</div>
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default Header;