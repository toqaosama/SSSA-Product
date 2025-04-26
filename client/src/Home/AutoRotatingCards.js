import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import './Styles/AutoRotatingCards.css';
import { Container } from 'react-bootstrap';

function AutoRotatingCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const cards = [
    {
      title: "First Card",
      text: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
      className: "card-dark" // CSS class for first card
    },
    {
      title: "Second Card",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.text}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default AutoRotatingCards;