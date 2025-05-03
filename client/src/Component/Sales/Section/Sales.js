import React, { useState, useEffect } from 'react';
import './Sales.css';
import { FiShoppingBag } from 'react-icons/fi';
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

  const getCategoryFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('category') || 'all';
  };

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

  const fetchCategories = async () => {
    setLoadingCategories(true);
    setErrorCategories(null);
    try {
      const response = await authApi.get('/category');
      const allCategories = [{ id: 'all', name: 'All' }, ...response.data.categories];
      setCategories(allCategories);
      setLoadingCategories(false);
    } catch (err) {
      setErrorCategories(err.message || 'Failed to fetch categories');
      setLoadingCategories(false);
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const categoryId = getCategoryFromUrl();
    setActiveTab(categoryId);
  }, [location.search]);

  const handleTabClick = (categoryId) => {
    if (categoryId !== activeTab) {
      navigate(`/sales?category=${categoryId}`, { replace: true });
    }
  };

  const getFilteredProducts = () => {
    if (activeTab === 'all') return products;
    return products.filter(product => product.category_id?.toString() === activeTab.toString());
  };

  const filteredProducts = getFilteredProducts();

  if (loadingProducts || loadingCategories) {
    return <LoadingSpinner />;
  }

  if (errorProducts) {
    return <div>Error loading products: {errorProducts}</div>;
  }

  if (errorCategories) {
    return <div>Error loading categories: {errorCategories}</div>;
  }

  return (
      <div className="compact-sales-page">
        <div className="compact-sales-container">
          <div className="compact-header">
            <h2>Explore Our Services</h2>
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
                <p>No services available in this category.</p>
              </div>
          ) : (
              <div className="compact-grid">
                {filteredProducts.map(item => {
                  const imageUrl = item.images[0]?.img || PLACEHOLDER_IMAGE;

                  return (
                      <div key={item.id} className="compact-card">
                        <div
                            className="compact-image"
                            style={{
                              backgroundImage: `url(${process.env.REACT_APP_API_URL + '/uploads/' + imageUrl})`,
                            }}
                        />
                        <div className="compact-content">
                          <h3>{item.name}</h3>
                          <div className="compact-meta">
                            <span className="category">{item.categoryName}</span>
                          </div>
                          <Link to={`/ProductsDetails/${item.id}`} className="compact-shop-button">
                            <FiShoppingBag size={12} /> Learn More
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
