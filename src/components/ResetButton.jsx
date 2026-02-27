import api from '../api';
import { useState } from 'react';
import './ResetButton.css';

export function ResetButton({ loadCart }) {
    const [isResetting, setIsResetting] = useState(false);

    const handleReset = async () => {
        setIsResetting(true);
        await api.post('/api/reset');
        await loadCart();
        setIsResetting(false);
    };

    return (
        <button
            className={`reset-floating-button ${isResetting ? 'resetting' : ''}`}
            onClick={handleReset}
            disabled={isResetting}
            title="Reset data"
        >
            <span className="reset-icon">🗑</span>
            <span className="reset-text">{isResetting ? 'Resetting...' : 'Reset'}</span>
        </button>
    );
}
