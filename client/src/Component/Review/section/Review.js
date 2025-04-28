import React, { useState } from 'react';
import { Carousel, Button, Form, Modal } from 'react-bootstrap';
import '../styles/Review.css';

const ReviewCarousel = () => {
  const reviews = [
    { id: 1, img: '01-Review.webp', alt: '01-Review' },
    { id: 2, img: '01-Review-08.webp', alt: '01-Review 08' },
    { id: 3, img: '01-Review-04.webp', alt: '01-Review 04' },
    { id: 4, img: '01-Review-03.webp', alt: '01-Review 03' },
    { id: 5, img: '01-Review-02.webp', alt: '01-Review 02' },
    { id: 6, img: '01-Review-05.webp', alt: '01-Review 05' },
    { id: 7, img: '01-Review-07.webp', alt: '01-Review 07' },
    { id: 8, img: '01-Review-009.webp', alt: '01-Review 009' },
    { id: 9, img: '01-Review-06.webp', alt: '01-Review 06' },
  ];

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 5,
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    // For now, we'll just log it and close the modal
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      review: '',
      rating: 5,
      image: null
    });
    setShowModal(false);
  };

  // Group reviews into chunks of 3 for the carousel
  const chunkSize = 3;
  const reviewGroups = [];
  for (let i = 0; i < reviews.length; i += chunkSize) {
    reviewGroups.push(reviews.slice(i, i + chunkSize));
  }

  return (
    <div className="review-container">
      <div className="review-header">
        <h2>Clients' Reviews</h2>
        <div className="header-underline"></div>
        <button 
          className="add-review-btn"
          onClick={() => setShowModal(true)}
        >
          +
        </button>
      </div>
      
      <Carousel 
        indicators={true} 
        interval={2000} 
        pause={'hover'} 
        slide={true} 
        fade={false}
        wrap={true}
        className="review-carousel"
      >
        {reviewGroups.map((group, index) => (
          <Carousel.Item key={index}>
            <div className="review-group">
              {group.map((review) => (
                <div key={review.id} className="review-item">
                  <img
                    src={`https://backlink-group.com/wp-content/uploads/2024/06/${review.img}`}
                    alt={review.alt}
                    className="review-image"
                  />
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Review Form Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
        className="review-modal"
      >
        <Modal.Header closeButton className="review-modal-header">
          <Modal.Title className="review-modal-title">
            <h2>Add Your Review</h2>
            <div className="header-underline"></div>
          </Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="review-modal-body">
          <Form onSubmit={handleSubmit} className="review-form">
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="review-input"
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
                className="review-input"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="review-input"
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
                className="review-input"
              />
            </Form.Group>

            <div className="modal-footer-buttons">
              <Button 
                variant="secondary" 
                onClick={() => setShowModal(false)}
                className="review-cancel-btn"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="review-submit-btn"
              >
                Submit Review
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReviewCarousel;