import React from 'react';
import { Carousel } from 'react-bootstrap';
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
    </div>
  );
};

export default ReviewCarousel;