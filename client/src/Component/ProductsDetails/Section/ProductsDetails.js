import { useParams, Link } from 'react-router-dom';
import './Style/ProductsDetails.css'; // Make sure this CSS file exists and is styled
import authApi from '../../../api/authApi'; // Assuming this is configured for your backend
import {Cart, Heart, StarFill, Star, CheckAll, Clock} from "react-bootstrap-icons";
import { Table, Form, Button, Spinner, Alert } from 'react-bootstrap'; // Import necessary components
import { useState, useEffect } from "react";
import {AiOutlineLoading} from "react-icons/ai";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import {useAuth} from "../../../Context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState([]); // Initialize as empty array, will fetch from API
  const [reviewsLoading, setReviewsLoading] = useState(false); // State for loading reviews
  const [reviewsError, setReviewsError] = useState(null); // State for reviews error

  // State for the Add Review Form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSubmissionError, setReviewSubmissionError] = useState(null); // State for submission error
  const [reviewSubmissionSuccess, setReviewSubmissionSuccess] = useState(false); // State for submission success message
  const [requestServiceLoading, setRequestServiceLoading] = useState(false);
  const [requestServiceSuccess, setRequestServiceSuccess] = useState(false);
  const [orderExistsStatus, setOrderExistsStatus] = useState("");
  const {isAuthenticated} = useAuth();

  const StarRating = ({ rating }) => {
    const roundedRating = Math.round(rating); // Use rounded rating for filled stars
    return (
        <div className="star-rating d-flex align-items-center">
          {[...Array(5)].map((_, i) => (
              <span key={i} className={i < roundedRating ? 'star filled' : 'star'}>
            {i < rating ? <StarFill color="#ffc107" /> : <Star color="#e4e5e9" />}
          </span>
          ))}
        </div>
    );
  };

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      setLoading(true);
      setReviewsLoading(true);
      setReviewsError(null); // Clear previous errors

      let productResponse = null; // Declare productResponse here

      try {
        // Fetch Product Details
        productResponse = await authApi.get(`/products/${id}`); // Assign to the declared variable
        const productData = productResponse.data.product;
        console.log("Fetched Product Data:", productData);

        const formattedProduct = {
          id: productData.id,
          name: productData.name,
          price: productData.price,
          rating: productData.rating,
          reviews: productData.numberOfRatings, // This seems to be the *count* from product data
          images: productData.images.map(img => img.img),
          inStock: true, // TODO: Update based on actual API data if available
          features: productData.descriptions.map(desc => ({
            head: desc.head,
            value: desc.desc
          })),
          category: {
            id: productData.category_id,
            name: productData.categoryName
          },
          main_description: productData.main_description
        };
        setProduct(formattedProduct);

        // Fetch Product Reviews
        const reviewsResponse = await authApi.get(`/product/${id}/reviews`); // Use the correct endpoint
        console.log("Fetched Reviews Data:", reviewsResponse.data);

        // Map backend review structure to frontend structure and filter active reviews
        const activeReviews = reviewsResponse.data.reviews
            .filter(review => review.isActive === 1) // Only display active reviews
            .map(review => ({
              id: review.id,
              // Backend getProductReviews doesn't return userName, using user_id as fallback
              userName: review.userName,
              rating: review.rate, // Map 'rate' from backend to 'rating'
              comment: review.comment,
              // Add other fields if needed, like created_at
              createdAt: review.created_at
            }));
        setReviews(activeReviews);


      } catch (error) {
        console.error('Error fetching product or reviews:', error);
        // Decide if error should stop product display or just reviews
        // For now, log product error, set product to null if fetch failed
        // Set reviews error specifically
        if (error.response && error.response.status === 404) {
          // Product not found error
          setProduct(null);
          setReviews([]); // No reviews if product not found
          setReviewsError('Product or its reviews not found.');
        } else {
          // Other errors
          setReviewsError('Failed to load reviews.');
          // Now productResponse is accessible here
          if (!productResponse) { // Check if product fetch specifically failed
            console.error('Error fetching product:', error); // Log product error if it happened
            setProduct(null); // Ensure product is null if its fetch failed
          }
        }


      } finally {
        setLoading(false); // Product loading finished
        setReviewsLoading(false); // Reviews loading finished
      }
    };

    const fetchOrderIsExists = async () => {
      try {
        const res = await authApi.get(`/service-order/${id}`);
        setOrderExistsStatus(res.data.order.status);
      } catch (e) {
        console.log(e)
      }
    }

    fetchOrderIsExists();
    fetchProductAndReviews();
  }, [id]); // Dependency array includes 'id'

  const handleRequestService = async () => {
    if (!isAuthenticated()) {
      alert("Please login to request service")
      return;
    }

    try {
      setRequestServiceLoading(true);
      const res = await authApi.post('/service-order', {product_id: product.id});
      setRequestServiceSuccess(true);
      setRequestServiceLoading(false);
    } catch (e) {
      console.log(e)
      alert("Failed to request service. Please try again.")
      setRequestServiceLoading(true);
    }
  };

  // --- Review Form Handlers ---
  const handleReviewRatingChange = (rating) => {
    setNewReviewRating(rating);
  };

  const handleReviewCommentChange = (event) => {
    setNewReviewComment(event.target.value);
  };

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    setReviewSubmissionError(null); // Clear previous errors
    setReviewSubmissionSuccess(false); // Clear previous success messages

    // Basic validation
    if (newReviewRating === 0 || newReviewComment.trim() === '') {
      setReviewSubmissionError('Please provide both a rating and a comment.');
      return;
    }

    setSubmittingReview(true);

    try {
      // Use the correct backend endpoint and send required data
      const reviewResponse = await authApi.post('/review/create', {
        product_id: id, // Get product_id from useParams
        rate: newReviewRating, // Map frontend rating to backend rate
        comment: newReviewComment.trim(),
        // user_id is handled by the backend checkAuth middleware (req.user.id)
      });

      console.log('Review submission response:', reviewResponse.data);

      // Handle success
      setReviewSubmissionSuccess(true); // Show success message
      // Reset form
      setNewReviewRating(0);
      setNewReviewComment('');
      // Don't hide the form immediately, let the user see the success message
      // setShowReviewForm(false); // Decide if you want to hide it automatically

      // IMPORTANT: The backend sets isActive = 0. The review won't appear
      // in the list until an admin activates it. Inform the user.


    } catch (error) {
      console.error('Error submitting review:', error);
      // Handle error
      setReviewSubmissionError('Failed to submit review. Please try again. Ensure you are logged in.');
      // Optionally, check error.response.status for specific messages (e.g., 401 for not logged in)
      if (error.response && error.response.status === 401) {
        setReviewSubmissionError('You must be logged in to submit a review.');
      } else if (error.response && error.response.data && error.response.data.message) {
        setReviewSubmissionError(`Failed to submit review: ${error.response.data.message}`);
      } else {
        setReviewSubmissionError('Failed to submit review. Please try again.');
      }


    } finally {
      setSubmittingReview(false);
    }
  };
  // -----------------------------


  // --- Loading and Error States ---
  if (loading && !product) { // Show full loading screen only if product hasn't loaded yet
    return <div className="loading">Loading product details...</div>;
  }

  if (!product) { // Handle product not found or initial product fetch error
    return <div className="error">Product not found or failed to load.</div>;
  }

  return (
      // Main container encompassing product details and reviews
      <div className="product-page-container">

        {/* Existing Product Details Layout */}
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

            {/* Rating Section - Using the reusable component */}
            <div className="product-rating">
              {product.rating !== null ? (
                  <>
                    <StarRating rating={product.rating} /> {/* Use the component */}
                    <span className="review-count ms-2">({product.reviews || 0} reviews)</span> {/* product.reviews is the count */}
                  </>
              ) : (
                  <span className="text-muted">No rating yet</span>
              )}
            </div>

            <div className="product-price">${product.price ? product.price.toFixed(2) : 'N/A'}</div>


            <div className="product-description">
              <p>{product.main_description}</p>
            </div>

            {product.features && product.features.length > 0 && (
                <div className="product-features mt-4">
                  <h3 className="mb-3">Features</h3>
                  <Table striped bordered hover responsive size="sm" className="features-table">
                    <thead>
                    <tr>
                      <th style={{ width: '30%' }}>Feature</th>
                      <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {product.features.map((feature, index) => (
                        <tr key={index} style={{ fontSize: '12px' }}>
                          <td><strong>{feature.head}</strong></td>
                          <td>{feature.value}</td>
                        </tr>
                    ))}
                    </tbody>
                  </Table>
                </div>
            )}

            <div className="product-actions mt-3">
              {orderExistsStatus === 'processing' || orderExistsStatus === 'waiting' ?
                  <Button
                      variant={orderExistsStatus === 'waiting' ? 'warning' : 'success'}
                      disabled
                      className="w-100 p-2"
                  >
                    {orderExistsStatus === 'waiting' && (
                        <>
                          <Clock /> Your order is currently waiting
                        </>
                    )}
                    {orderExistsStatus === 'processing' && (
                        <>
                          <AiOutlineLoading /> Your order is currently processing
                        </>
                    )}
                  </Button>

                  :
                  (<button
                  className="add-to-cart me-2"
                  onClick={handleRequestService}
                  disabled={requestServiceLoading}
              >
                {requestServiceLoading ? (
                    <AiOutlineLoading />
                ): (
                    requestServiceSuccess ? <CheckAll />: <Cart />
                )}
                <span className={"ms-2 align-middle"}>
                  {requestServiceLoading ? "Loading..." : (requestServiceSuccess ? "Done" : "Request Service")}
                </span>
              </button>)}

            </div>
          </div>
        </div> {/* End of product-details-container */}

        {/* ===== Reviews Section ===== */}
        <div className="product-reviews-section mt-5"> {/* Add margin-top */}
          <h2 className="mb-4">Customer Reviews</h2> {/* Section Title */}

          {/* "Write a Review" Button */}
          <button
              className="write-review-btn mb-4"
              onClick={() => setShowReviewForm(!showReviewForm)}
          >
            {showReviewForm ? 'Hide Review Form' : 'Write a Review'}
          </button>

          {/* Add Review Form (Conditionally Rendered) */}
          {showReviewForm && (
              <div className="add-review-form p-4 border rounded mb-4">
                <h3>Add Your Review</h3>

                {/* Submission Error Alert */}
                {reviewSubmissionError && (
                    <Alert variant="danger" onClose={() => setReviewSubmissionError(null)} dismissible>
                      {reviewSubmissionError}
                    </Alert>
                )}

                {/* Submission Success Alert */}
                {reviewSubmissionSuccess && (
                    <Alert variant="success" onClose={() => setReviewSubmissionSuccess(false)} dismissible>
                      Thank you for your review! It will be visible after admin approval.
                    </Alert>
                )}


                <Form onSubmit={handleSubmitReview}>
                  <Form.Group className="mb-3" controlId="reviewRating">
                    <Form.Label>Rating:</Form.Label>
                    <div>
                      {[...Array(5)].map((_, i) => (
                          <span
                              key={i}
                              className="star"
                              style={{ cursor: 'pointer', fontSize: '1.5em', color: i < newReviewRating ? '#ffc107' : '#e4e5e9' }}
                              onClick={() => handleReviewRatingChange(i + 1)}
                          >
                      {i < newReviewRating ? <StarFill /> : <Star />}
                    </span>
                      ))}
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="reviewComment">
                    <Form.Label>Comment:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={newReviewComment}
                        onChange={handleReviewCommentChange}
                        required
                    />
                  </Form.Group>

                  <button className="write-review-btn" type="submit" disabled={submittingReview}>
                    {submittingReview ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                          Submitting...
                        </>
                    ) : (
                        'Submit Review'
                    )}
                  </button>
                </Form>
              </div>
          )}

          {/* Display Reviews */}
          {reviewsLoading ? (
              <div className="loading">Loading reviews...</div>
          ) : reviewsError ? (
              <Alert variant="danger">{reviewsError}</Alert>
          ) : reviews && reviews.length > 0 ? (
              <div className="reviews-list">
                {reviews.map((review) => (
                    <div key={review.id} className="review-item mb-4 p-3 border rounded">
                      <div className="review-header d-flex justify-content-between align-items-center mb-2">
                        <strong className="review-user-name">{review.userName}</strong> {/* Use fetched userName (or fallback) */}
                        <StarRating rating={review.rating} /> {/* Use the component */}
                      </div>
                      <p className="review-comment text-muted">{review.comment}</p>
                       {review.createdAt && <span className="review-date text-sm text-secondary">Reviewed on {new Date(review.createdAt).toLocaleDateString()}</span>}
                    </div>
                ))}
              </div>
          ) : (
              <p>No active reviews yet for this product.</p> // Message when there are no reviews
          )}

        </div>
        {/* ===== End of Reviews Section ===== */}

      </div> // End of product-page-container
  );
};

export default ProductDetails;