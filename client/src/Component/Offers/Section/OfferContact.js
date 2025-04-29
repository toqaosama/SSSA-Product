import React from 'react';
import { FiChevronRight } from 'react-icons/fi'; // Import the icon
import './Style/OfferContact.css';
import { Link } from 'react-router-dom';

const OfferContact = () => {
  return (
    <div className="compact-sales-page">
       <div className="compact-newsletter">
        <h3>Get More Deals</h3>
        <p>Subscribe for exclusive offers</p>
        <div className="compact-subscribe">
          <input type="email" placeholder="Email address" />
          <button>Join</button>
        </div>
      </div>
    </div>
  );
};

export default OfferContact;