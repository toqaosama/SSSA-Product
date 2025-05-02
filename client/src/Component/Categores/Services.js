import React, {useState} from 'react';
import './Style/Categores.css';

const Services = () => {
  const [categories, setCategories] = useState([]);

  return (
    <div className="categories-container">
      <h2 className="categories-title ">Our Services</h2>
      <div className="categories-list">
        {categories.map((category, index) => (
          <div 
            className={`category-card ${index % 2 === 0 ? 'image-left' : 'image-right'}`} 
            key={category.id}
          >
            <div className="card-image-container">
              <img 
                src={category.image} 
                alt={category.title}
                className="card-image"
                loading="lazy"
              />
            </div>
            <div className="card-contents">
              <h3 className="card-titless">{category.title}</h3>
              <p className="card-description">{category.description}</p>
              <button className="explore-btn">Explore {category.title}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;