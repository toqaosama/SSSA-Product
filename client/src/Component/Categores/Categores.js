import React from 'react';
import './Style/Categores.css';

const Categores = () => {
  const categories = [
    {
      id: 1,
      title: "Electronics",
      description: "Latest gadgets and electronic devices for your everyday needs. Explore our wide range of smartphones, laptops, and smart home devices.",
      image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 2,
      title: "Fashion",
      description: "Trendy clothing and accessories for all seasons. Discover the latest styles in men's, women's, and children's fashion.",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 3,
      title: "Home & Kitchen",
      description: "Everything you need to make your house a home. From furniture to kitchen appliances and home decor.",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 4,
      title: "Books",
      description: "Explore worlds through our vast collection of books. Fiction, non-fiction, academic, and children's books available.",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 5,
      title: "Sports",
      description: "Equipment and gear for your favorite sports activities. Fitness, outdoor, team sports, and more.",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
      id: 6,
      title: "Beauty",
      description: "Products to help you look and feel your best. Skincare, makeup, haircare, and personal grooming essentials.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80"
    }
  ];

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

export default Categores;