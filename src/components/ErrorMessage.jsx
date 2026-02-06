export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <h2>Oops! Something went wrong</h2>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Try Again
        </button>
      )}
    </div>
  );
}
