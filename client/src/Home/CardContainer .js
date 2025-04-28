import React from 'react';
import CardComponent from './Sections/AboutCard';
import { cardDetails } from '../Core/cardDetails';
import './Styles/CardContainer.css';

const CardContainer = () => {
  return (
    <div className="card-container">
      {cardDetails.map((card) => (
        <CardComponent 
          key={card.id}
          id={card.id}
          title={card.title}
          content={card.content}
          icon={card.icon}
        />
      ))}
    </div>
  );
};

export default CardContainer;