import React from 'react';
import './LoadingSpinner.css'; // Import the CSS for the spinner

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
        </div>
    );
};

export default LoadingSpinner;