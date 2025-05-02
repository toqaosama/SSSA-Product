import React, { useState, useEffect } from 'react';
import './Sales.css';
import { FiClock, FiShoppingBag, FiTag } from 'react-icons/fi';
// import Offers from '../../Offers/Section/Offers';
import OfferContact from '../../Offers/Section/OfferContact';
import authApi from '../../../api/authApi';
import LoadingSpinner from '../../../Component/LoadingSpinner/LoadingSpinner';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300';

const Sales = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorCategories, setErrorCategories] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Get category from URL query parameter
  const getCategoryFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('category') || 'all';
  };

  // Fetch products from API
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
      console.error('Error fetching products:', err);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    setLoadingCategories(true);
    setErrorCategories(null);
    try {
      const response = await authApi.get('/category');
      // Add 'all' category and store complete category objects
      const allCategories = [
        { id: 'all', name: 'All' },
        ...response.data.categories
      ];
      setCategories(allCategories);
      setLoadingCategories(false);
    } catch (err) {
      setErrorCategories(err.message || 'Failed to fetch categories');
      setLoadingCategories(false);
      console.error('Error fetching categories:', err);
    }
  };

  // Initial data fetching
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Update active tab when URL changes
  useEffect(() => {
    const categoryId = getCategoryFromUrl();
    setActiveTab(categoryId);
  }, [location.search]);

  // Handle tab click and update URL
  const handleTabClick = (categoryId) => {
    if (categoryId !== activeTab) {
      navigate(`/sales?category=${categoryId}`, { replace: true });
    }
  };

  // Filter products based on active category
  const getFilteredProducts = () => {
    if (activeTab === 'all') {
      return products;
    }

    return products.filter(product => {
      // Filter by category_id - ensure we're comparing strings
      return product.category_id?.toString() === activeTab.toString();
    });
  };

  const filteredProducts = getFilteredProducts();

  const calculateDaysLeft = dateString => {
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
              {categories.map(category => (
                  <button
                      key={category.id}
                      className={activeTab === category.id.toString() ? 'active' : ''}
                      onClick={() => handleTabClick(category.id)}
                  >
                    {category.name}
                  </button>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
              <div className="no-items-message">
                <p>No promotions available in this category.</p>
              </div>
          ) : (
              <div className="compact-grid">
                {filteredProducts.map(item => {
                  const daysLeft = calculateDaysLeft(item.validUntil);
                  const imageUrl = item.images[0]?.img || PLACEHOLDER_IMAGE;

                  return (
                      <div
                          key={item.id}
                          className={`compact-card ${item.featured ? 'featured' : ''} ${
                              item.urgent ? 'urgent' : ''
                          }`}
                      >
                        {item.discount && (
                            <div className="compact-badge">
                              <FiTag size={12} /> {item.discount}
                            </div>
                        )}
                        <div
                            className="compact-image"
                            style={{
                              backgroundImage: `url(${process.env.REACT_APP_API_URL + '/uploads/' + imageUrl})`,
                            }}
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
                          <Link to={`/ProductsDetails/${item.id}`} className="compact-shop-button">
                            <FiShoppingBag size={12} /> Shop Now
                          </Link>
                        </div>
                      </div>
                  );
                })}
              </div>
          )}
        </div>

        <OfferContact />
      </div>
  );
};

export default Sales;