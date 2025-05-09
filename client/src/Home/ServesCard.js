import React, { useRef, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { servicesData } from '../Core/servicesData'; // Import your data
import './Styles/ServiceCard.css'
const ServiceCard = ({ service }) => {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const moveX = (x - centerX) / centerX;
    const moveY = (y - centerY) / centerY;
    
    const translateX = -moveX * 10;
    const translateY = -moveY * 10;
    
    setTransform(`translate(${translateX}px, ${translateY}px)`);
  };

  const handleMouseLeave = () => {
    setTransform('');
  };

  return (
<Card

      className="service-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
    >
      <div className="service-card-icon">
        <i className={`fas ${service.icon}`} aria-hidden="true"></i>
      </div>
      <Card.Body className="service-card-body">
        <Card.Title className="service-card-title">
          {service.title}
        </Card.Title>
        <Card.Text className="service-card-description">
          {service.description}
        </Card.Text>
      </Card.Body>
    </Card>
  
  );
};

const ServicesPage = () => {
  return (
    <Container>
      <h1 style={{
          textAlign: 'center',
          justifyContent: 'center',
          justifyItems: 'center',
          fontWeight: 'bolder',
          color: '#917243',
          marginTop: '2%',
          marginBottom: '2%',
          hover:{
              color: '#ffffff',
          }
      }}>
        Our Services
      </h1>
      <Row className="d-flex align-items-stretch">
  {servicesData.map((service) => (
    <Col
      key={service.id}
      lg={4}
      md={6}
      xs={12}
      className="mb-4 d-flex"      // ← make each column a flex container
    >
      <ServiceCard service={service} />
    </Col>
  ))}
</Row>

    </Container>
  );
};
export default ServicesPage;