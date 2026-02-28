import { useState, useEffect, useRef } from 'react';
import './Header.css'
import { NavLink, useNavigate, useSearchParams } from 'react-router';

function Header({ cart }) {
    let totalQuantity = 0;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const prevQuantityRef = useRef(0);
    const [isBouncing, setIsBouncing] = useState(false);

    for (const element of cart) {
        totalQuantity += element.quantity;
    }

    // Cart badge bounce animation when quantity changes
    useEffect(() => {
        if (totalQuantity !== prevQuantityRef.current && prevQuantityRef.current !== 0) {
            setIsBouncing(true);
            const timer = setTimeout(() => setIsBouncing(false), 400);
            return () => clearTimeout(timer);
        }
        prevQuantityRef.current = totalQuantity;
    }, [totalQuantity]);

    const handleOnClick = () => {
        setText("");
        navigate(`/?search=${text}`);
    }

    const [text, setText] = useState(searchParams.get('search') || "");
    return (
        <>
            <div className="header">
                <div className="left-section">
                    <NavLink to="/" className="header-link" aria-label="Home">
                        {/* [web-design-guidelines: images need alt] */}
                        <img className="logo" src="images/logo-white.png" alt="Store logo" />
                        <img className="mobile-logo" src="images/mobile-logo-white.png" alt="Store logo" />
                    </NavLink>
                </div>

                <div className="middle-section">
                    {/* [web-design-guidelines: inputs need autocomplete, correct type] */}
                    <input
                        className="search-bar"
                        type="search"
                        placeholder="Search…"
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter')
                                handleOnClick();
                        }}
                        autoComplete="off"
                        aria-label="Search products"
                    />

                    <button
                        className="search-button"
                        onClick={() => {
                            handleOnClick();
                        }}
                        aria-label="Search"
                    >
                        <img className="search-icon" src="images/icons/search-icon.png" alt="" aria-hidden="true" />
                    </button>
                </div>

                <div className="right-section">
                    <NavLink className="orders-link header-link" to="/orders">
                        <span className="orders-text">Orders</span>
                    </NavLink>

                    <NavLink className="cart-link header-link" to="/checkout">
                        <img className="cart-icon" src="images/icons/cart-icon.png" alt="Cart" />
                        <div className={`cart-quantity ${isBouncing ? 'cart-bounce' : ''}`}>
                            {totalQuantity}
                        </div>
                        <div className="cart-text">Cart</div>
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default Header;