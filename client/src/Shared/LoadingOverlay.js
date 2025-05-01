// src/components/LoadingOverlay.js
import React from 'react';
import LoadingSpinner from "../Component/LoadingSpinner/LoadingSpinner";

const LoadingOverlay = () => {
  return (
    <div style={overlayStyles}>
      <LoadingSpinner />
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

export default LoadingOverlay;
