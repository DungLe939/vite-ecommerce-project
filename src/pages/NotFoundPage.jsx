import { Link } from 'react-router';
import './NotFoundPage.css';

const NotFoundPage = () => {
    return (
        <div className="not-found-container">
            <h1 className="error-code">404</h1>
            <h2 className="error-message">Oops! Page not found</h2>
            <p className="error-description">
                The page you are looking for might have been removed, had its name changed,
                or is temporarily unavailable.
            </p>
            <Link to="/" className="home-button">
                Go to Homepage
            </Link>
        </div>
    );
};

export default NotFoundPage;
