import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Style/ProductsDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const mockProduct = {
          id: id,
          name: `Premium Product ${id}`,
          price: 99.99,
          description: 'This is a high-quality product with excellent features. Designed for comfort and durability, it will exceed your expectations.',
          rating: 4.5,
          reviews: 128,
          images: [
            'https://via.placeholder.com/800x600?text=Product+Image+1',
            'https://via.placeholder.com/800x600?text=Product+Image+2',
            'https://via.placeholder.com/800x600?text=Product+Image+3',
            'https://via.placeholder.com/800x600?text=Product+Image+4'
          ],
          inStock: true,
          features: [
            'Premium quality materials',
            'Eco-friendly production',
            '1-year warranty',
            'Free shipping'
          ],
          category: {
            id: 'cat123',
            name: 'Electronics'
          },
          specifications: {
            weight: '1.2 kg',
            dimensions: '15 × 10 × 5 cm',
            model: 'X-5000'
          }
        };
        
        setProduct(mockProduct);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-details-container">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span> / </span>
        <Link to={`/category/${product.category.id}`}>{product.category.name}</Link>
        <span> / </span>
        <span>{product.name}</span>
      </div>

      <div className="product-images">
        <div className="main-image">
          <img src={product.images[selectedImage]} alt={product.name} />
        </div>
        <div className="thumbnail-container">
          {product.images.map((image, index) => (
            <div 
              key={index} 
              className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="product-info">
        <div className="category-badge">
          <Link to={`/category/${product.category.id}`}>
            {product.category.name}
          </Link>
        </div>
        
        <h1 className="product-title">{product.name}</h1>
        
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>
              {i < product.rating ? '★' : '☆'}
            </span>
          ))}
          <span className="review-count">({product.reviews} reviews)</span>
        </div>
        
        <div className="product-price">${product.price.toFixed(2)}</div>
        
        <div className="product-description">
          <p>{product.description}</p>
        </div>
        
        {product.features && product.features.length > 0 && (
          <div className="product-features">
            <h3>Features:</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {product.specifications && (
          <div className="product-specs">
            <h3>Specifications:</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Weight:</span>
                <span className="spec-value">{product.specifications.weight}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Dimensions:</span>
                <span className="spec-value">{product.specifications.dimensions}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Model:</span>
                <span className="spec-value">{product.specifications.model}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="quantity-selector">
          <label>Quantity:</label>
          <input 
            type="number" 
            min="1" 
            value={quantity} 
            onChange={handleQuantityChange}
          />
        </div>
        
        <div className="product-actions">
          <button 
            className="add-to-cart" 
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <button className="wishlist">Add to Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;