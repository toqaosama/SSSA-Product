import { useParams, Link } from 'react-router-dom';
import './Style/ProductsDetails.css';
import authApi from '../../../api/authApi';
import { Cart, Heart } from "react-bootstrap-icons";
// Import Table and remove Card, ListGroup if they are no longer needed anywhere else
// import { Card, ListGroup, Table } from 'react-bootstrap'; // Option 1: Keep unused imports
import { Table } from 'react-bootstrap'; // Option 2: Remove unused Card, ListGroup imports
import { useState, useEffect } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await authApi.get(`/products/${id}`);
        const productData = response.data.product;
        console.log(productData) // Keep or remove console.log as needed
        const formattedProduct = {
          id: productData.id,
          name: productData.name,
          price: productData.price,
          // Keep your original description logic if needed, or simplify if main_description replaces it
          // description: productData.desc_combined.replace(';;', ' ').replace('||', ': '),
          rating: productData.rating,
          reviews: productData.numberOfRatings,
          images: productData.images.map(img => img.img),
          inStock: true, // Consider updating this based on actual API data if available
          features: productData.descriptions.map(desc => ({
            head: desc.head,
            value: desc.desc
          })),
          category: {
            id: productData.category_id,
            name: productData.categoryName
          },
          main_description: productData.main_description // Added main_description
        };

        setProduct(formattedProduct);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    // Implement actual cart logic here
    alert(`Added ${product.name} to cart!`);
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
      <div className="product-details-container">
        {/* Breadcrumb Section */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span> / </span>
          <Link to={`/sales?category=${product.category.id}`}>{product.category.name}</Link>
          <span> / </span>
          <span>{product.name}</span>
        </div>

        {/* Product Images Section */}
        <div className="product-images">
          <div className="main-image">
            <img src={`${process.env.REACT_APP_API_URL}/uploads/${product.images[selectedImage]}`} alt={product.name} />
          </div>
          <div className="thumbnail-container">
            {product.images.map((image, index) => (
                <div
                    key={index}
                    className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                >
                  <img src={`${process.env.REACT_APP_API_URL}/uploads/${image}`} alt={`Thumbnail ${index + 1}`} />
                </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="product-info">
          <div className="category-badge">
            <Link to={`/products?category=${product.category.id}`}>
              {product.category.name}
            </Link>
          </div>

          <h1 className="product-title">{product.name}</h1>

          {/* Rating Section */}
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? 'star filled' : 'star'}>
              {/* Using actual stars for better visual */}
                  {i < product.rating ? '★' : '☆'}
            </span>
            ))}
            <span className="review-count">({product.reviews} reviews)</span>
          </div>

          <div className="product-price">${product.price.toFixed(2)}</div>

          {/* Main Description Section */}
          <div className="product-description">
            {/* Displaying the main_description */}
            <p>{product.main_description}</p>
          </div>

          {/* Features/Specifications Section (Using Table) */}
          {product.features && product.features.length > 0 && (
              <div className="product-features mt-4">
                <h3 className="mb-3">Features</h3> {/* Heading */}
                <Table striped bordered hover responsive size="sm" className="features-table">
                  <thead>
                  <tr>
                    <th style={{width: '30%'}}>Feature</th> {/* Adjust width as needed */}
                    <th>Description</th>
                  </tr>
                  </thead>
                  <tbody>
                  {product.features.map((feature, index) => (
                      <tr key={index} style={{fontSize: '12px'}}>
                        <td><strong>{feature.head}</strong></td>
                        <td>{feature.value}</td>
                      </tr>
                  ))}
                  </tbody>
                </Table>
              </div>
          )}

          {/* Action Buttons Section */}
          <div className="product-actions mt-3">
            <button
                className="add-to-cart btn btn-primary me-2"
                onClick={handleAddToCart}
                disabled={!product.inStock}
            >
              <span className={"align-middle"}><Cart /></span>
              <span className={"ms-2 align-middle"}>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>
            <button className="wishlist btn btn-outline-secondary">
              {/* Add wishlist functionality */}
              <span className={"align-middle"}><Heart /></span>
              <span className={"ms-2 align-middle"}>Add to Favourites</span>
            </button>
          </div>
        </div>
      </div>
  );
};

export default ProductDetails;