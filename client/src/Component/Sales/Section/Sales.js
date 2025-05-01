import React, { useState, useEffect } from 'react';
import './Sales.css';
import { FiClock, FiShoppingBag, FiTag } from 'react-icons/fi';
// import Offers from '../../Offers/Section/Offers'; // You've commented this out
import OfferContact from '../../Offers/Section/OfferContact';
import authApi from '../../../api/authApi';
import LoadingSpinner from '../../../Component/LoadingSpinner/LoadingSpinner'; // Import the Spinner component

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300';

const Sales = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorCategories, setErrorCategories] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      setErrorProducts(null);
      try {
        const response = await authApi.get('/products');
        setProducts(response.data.products);
        setLoadingProducts(false);
      } catch (err) {
        setErrorProducts(err.message || 'Failed to fetch products');
        setLoadingProducts(false);
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      setErrorCategories(null);
      try {
        const response = await authApi.get('/category');
        const categoryNames = response.data.categories.map(cat => cat.name.toLowerCase());
        setCategories(['all', ...categoryNames]);
        setLoadingCategories(false);
      } catch (err) {
        setErrorCategories(err.message || 'Failed to fetch categories');
        setLoadingCategories(false);
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const filteredItems = activeTab === 'all'
      ? products
      : products.filter(item => item.categoryName?.toLowerCase() === activeTab);

  const calculateDaysLeft = (dateString) => {
    if (!dateString) return 'N/A';
    const today = new Date();
    const expiry = new Date(dateString);
    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  };

  if (loadingProducts || loadingCategories) {
    return <LoadingSpinner />;
  }

  if (errorProducts) {
    return <div>Error loading promotions: {errorProducts}</div>;
  }

  if (errorCategories) {
    return <div>Error loading categories: {errorCategories}</div>;
  }

  return (
      <div className="compact-sales-page">
        {/* <Offers /> */}

        <div className="compact-sales-container">
          <div className="compact-header">
            <h2>Current Promotions</h2>
            <div className="compact-tabs">
              {categories.map((tab) => (
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
              const imageUrl = item.images[0]?.img || PLACEHOLDER_IMAGE;

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
                        style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL+'/uploads/'+imageUrl})` }}
                    />
                    <div className="compact-content">
                      <h3>{item.name}</h3>
                      <p>{item.descriptions.map(d => d.desc).join(', ')}</p>
                      <div className="compact-meta">
                    <span className="days-left">
                      <FiClock size={12} /> {daysLeft > 0 ? `${daysLeft}d left` : 'Expired'}
                    </span>
                        <span className="category">{item.categoryName}</span>
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