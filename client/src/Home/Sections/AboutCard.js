
import React from 'react';
import { Card } from 'react-bootstrap';
import '../Styles/cardDetails.css'

const CardComponent = ({ id, title, content, icon }) => {
  return (
    <Card className="trusted-card" key={id}>
      <Card.Body className="card-body">
        <div className="card-title-container">
          <div className="card-title-wrapper">
            <div className="card-title-inner">
              <div className="card-title-box">
                {icon && <i className="card-icon">{icon}</i>}
                <div className="card-title-text">
                  <Card.Title as="h4" className="card-title">
                    {title}
                  </Card.Title>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Card.Text className="card-content">
          <p className="card-text">{content}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;