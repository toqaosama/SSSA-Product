
import React, { useState } from 'react';
import './Sales.css';
import { FiClock, FiShoppingBag, FiTag, FiChevronRight } from 'react-icons/fi';
import Offers from '../../Offers/Section/Offers';
import OfferContact from '../../Offers/Section/OfferContact';

const Sales = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const salesItems = [
    {
      id: 1,
      title: "Summer Collection",
      discount: "40% OFF",
      description: "End-of-season clearance",
      category: "fashion",
      validUntil: "2023-08-31",
      image: "summer-sale.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Tech Gadgets",
      discount: "25% OFF",
      description: "Latest electronics sale",
      category: "electronics",
      validUntil: "2023-09-15",
      image: "tech-sale.jpg"
    },
    {
      id: 3,
      title: "Home Decor",
      description: "Buy 1 Get 1 Free",
      category: "home",
      validUntil: "2023-09-30",
      image: "home-decor.jpg"
    },
    {
      id: 4,
      title: "Clearance",
      discount: "70% OFF",
      description: "Final reductions",
      category: "clearance",
      validUntil: "2023-08-15",
      image: "clearance.jpg",
      urgent: true
    },
    {
      id: 5,
      title: "Summer Collection",
      discount: "40% OFF",
      description: "End-of-season clearance",
      category: "fashion",
      validUntil: "2023-08-31",
      image: "summer-sale.jpg",
      featured: true
    },
    {
      id: 6,
      title: "Tech Gadgets",
      discount: "25% OFF",
      description: "Latest electronics sale",
      category: "electronics",
      validUntil: "2023-09-15",
      image: "tech-sale.jpg"
    },
    {
      id: 7,
      title: "Home Decor",
      description: "Buy 1 Get 1 Free",
      category: "home",
      validUntil: "2023-09-30",
      image: "home-decor.jpg"
    },
    {
      id: 8,
      title: "Clearance",
      discount: "70% OFF",
      description: "Final reductions",
      category: "clearance",
      validUntil: "2023-08-15",
      image: "clearance.jpg",
      urgent: true
    }
  ];

  const filteredItems = activeTab === 'all' 
    ? salesItems 
    : salesItems.filter(item => item.category === activeTab);

  const calculateDaysLeft = (date) => {
    const today = new Date();
    const expiry = new Date(date);
    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="compact-sales-page">
      <Offers />

      <div className="compact-sales-container">
        <div className="compact-header">
          <h2>Current Promotions</h2>
          <div className="compact-tabs">
            {['all', 'fashion', 'electronics', 'home', 'clearance'].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="compact-grid">
          {filteredItems.map((item) => {
            const daysLeft = calculateDaysLeft(item.validUntil);
            
            return (
              <div 
                key={item.id} 
                className={`compact-card ${item.featured ? 'featured' : ''} ${item.urgent ? 'urgent' : ''}`}
              >
                {item.discount && (
                  <div className="compact-badge">
                    <FiTag size={12} /> {item.discount}
                  </div>
                )}
                <div 
                  className="compact-image" 
                  style={{ backgroundImage: `url(${item.image})` }} 
                />
                <div className="compact-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="compact-meta">
                    <span className="days-left">
                      <FiClock size={12} /> {daysLeft > 0 ? `${daysLeft}d left` : 'Expired'}
                    </span>
                    <span className="category">{item.category}</span>
                  </div>
                  <button className="compact-shop-button">
                    <FiShoppingBag size={12} /> Shop Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

     <OfferContact />
    </div>
  );
};

export default Sales;