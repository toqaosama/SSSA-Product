import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './Style/Offers.css';

const Offers = () => {
  const handleShopNowClick = () => {
    window.scrollTo(0, 0); // Scroll to top before navigation (optional)
  };

  return (
    <div className="compact-sales-page">
      <div className="compact-hero">
        <div className="hero-content">
          <h1>Seasonal Sales</h1>
          <p>Limited-time offers across all categories</p>
          <Link 
            to="/Sales" 
            className="cta-button"
            onClick={handleShopNowClick} // Ensures scroll to top
          >
            Shop Now <FiChevronRight className="icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Offers;