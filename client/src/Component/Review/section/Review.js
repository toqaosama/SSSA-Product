import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import '../styles/Review.css';
import CardReview from './CardReview';

const ReviewCarousel = () => {
  // State for reviews and form
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Alex Johnson', review: 'Excellent service!', rating: 5, img: '01-Review.webp' },
    { id: 2, name: 'Sarah Miller', review: 'Very professional team', rating: 4, img: '01-Review-08.webp' },
    { id: 3, name: 'Michael Brown', review: 'Great results!', rating: 5, img: '01-Review-04.webp' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 5,
    image: null
  });

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create new review with form data
    const newReview = {
      id: reviews.length + 1,
      name: formData.name,
      review: formData.review,
      rating: formData.rating,
      img: formData.image ? URL.createObjectURL(formData.image) : 'default-review.webp'
    };
    
    // Add to reviews and reset form
    setReviews([...reviews, newReview]);
    setFormData({ name: '', review: '', rating: 5, image: null });
    setShowModal(false);
  };

  return (
    <div className="review-container">
      <div className="review-header">
        <button 
          className="add-review-btn"
          onClick={() => setShowModal(true)}
        >
          Add Review
        </button>
      </div>
      
      {/* Centered CardReview with reviews passed as props */}
      <div className="card-review-container">
        <CardReview reviews={reviews} />
      </div>

      {/* Review Form Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="review-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Your Review</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Review</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="review"
                value={formData.review}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              >
                {[5, 4, 3, 2, 1].map(num => (
                  <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Image (Optional)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button 
                variant="secondary" 
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReviewCarousel;