import React, { useState } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import '../Style/ProductGallery.css';

const ProductGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const images = [
    "https://woodmart.xtemos.com/plants/wp-content/uploads/sites/12/2023/05/w-indoor-plants-small-8-0.jpg",
    "https://woodmart.xtemos.com/plants/wp-content/uploads/sites/12/2023/05/w-indoor-plants-small-8-1.jpg",
    "https://woodmart.xtemos.com/plants/wp-content/uploads/sites/12/2023/05/w-indoor-plants-small-8-2.jpg",
    "https://woodmart.xtemos.com/plants/wp-content/uploads/sites/12/2023/05/w-indoor-plants-small-8-3.jpg",
    "https://woodmart.xtemos.com/plants/wp-content/uploads/sites/12/2023/05/w-indoor-plants-small-2-1.jpg"
  ];

  const thumbnails = [
    "https://woodmart.xtemos.com/plants/wp-content/uploads/sites/12/2023/05/w-indoor-plants-small-8-0-190x217.jpg",
    "https://woodmart.xtemos.com/plants/wp-content/uploads/sites/12/2023/05/w-indoor-plants-small-8-1-190x217.jpg",
    "https://woodmart.xtemos.com/plants/wp-content/uploads/sites/12/2023/05/w-indoor-plants-small-8-2-190x217.jpg",
    "https://woodmart.xtemos.com/plants/wp-content/uploads/sites/12/2023/05/w-indoor-plants-small-8-3-190x217.jpg",
    "https://woodmart.xtemos.com/plants/wp-content/uploads/sites/12/2023/05/w-indoor-plants-small-2-1-190x217.jpg"
  ];

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <div className="product-gallery-container">
      
      
      <Carousel 
        activeIndex={activeIndex} 
        onSelect={handleSelect}
        indicators={false}
        className="main-carousel"
      >
        {images.map((img, index) => (
          <Carousel.Item key={index}>
            <Image
              className="d-block w-100 main-image"
              src={img}
              alt={`Product view ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="thumbnail-container">
        {thumbnails.map((thumb, index) => (
          <div 
            key={index}
            className={`thumbnail-item ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={thumb}
              alt={`Thumbnail ${index + 1}`}
              className="thumbnail-image"
            />
          </div>
        ))}
      </div>

      <div className="enlarge-button">
        <a href="#" rel="nofollow" className="enlarge-link">
          <span>Click to enlarge</span>
        </a>
      </div>
    </div>
  );
};

export default ProductGallery;