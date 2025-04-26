// useLoginModal.js
import { useState } from 'react';

export const useLoginModal = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  return {
    showLoginModal,
    openLoginModal,
    closeLoginModal
  };
};