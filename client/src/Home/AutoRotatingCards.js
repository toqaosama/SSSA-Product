import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './Styles/AutoRotatingCards.css';
import { Container } from 'react-bootstrap';

function AutoRotatingCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const cards = [
    {
      title: "Stop Thinking",

      className: "card-dark" // CSS class for first card
    },
    {
      title: "Start Calling",
    
      className: "card-light" // CSS class for second card
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <Container fluid className="cards-container">
      <div className="auto-rotating-cards-container">
        {cards.map((card, index) => (
          <Card 
            key={index}
            className={`auto-rotating-card ${card.className} ${
              index === activeIndex ? 'active' : ''
            }`}
          >
            <Card.Body className="card-content">
              <Card.Title style={{
  
  '@media (max-width: 1230px)': { fontSize: '6rem' },
  '@media (max-width: 992px)': { fontSize: '5rem' },
  '@media (max-width: 768px)': { fontSize: '4rem' },
  '@media (max-width: 576px)': { fontSize: '3rem' },
  '@media (max-width: 400px)': { fontSize: '2rem' }
}}>{card.title}</Card.Title>
              {/* <Card.Text>{card.title}</Card.Text> */}
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default AutoRotatingCards;