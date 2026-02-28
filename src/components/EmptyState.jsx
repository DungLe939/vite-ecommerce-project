import './EmptyState.css';

export function EmptyState({ icon, title, message, actionText, onAction }) {
    return (
        <div className="empty-state">
            <div className="empty-state-icon">{icon}</div>
            <h2 className="empty-state-title">{title}</h2>
            <p className="empty-state-message">{message}</p>
            {actionText && onAction ? (
                <button
                    className="empty-state-button button-primary"
                    onClick={onAction}
                    aria-label={actionText}
                >
                    {actionText}
                </button>
            ) : null}
        </div>
    );
}
