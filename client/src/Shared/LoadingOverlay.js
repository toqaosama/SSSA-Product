// src/components/LoadingOverlay.js
import React from 'react';

const LoadingOverlay = () => {
  return (
    <div style={overlayStyles}>
      <div style={spinnerStyles}></div>
    </div>
  );
};

const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // semi-transparent white
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999, // high z-index to be above everything
  pointerEvents: 'auto', // capture all events (disable interactions behind)
};

const spinnerStyles = {
  width: '50px',
  height: '50px',
  border: '6px solid #ccc',
  borderTop: '6px solid #007bff', // blue color
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
};

// Add spin animation via style
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`, styleSheet.cssRules.length);

export default LoadingOverlay;
