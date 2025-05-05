import React, { useRef, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { servicesData } from '../Core/servicesData'; // Import your data

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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        padding: '40px 34px 35px',
        transition: 'transform 0.3s ease-out, all 0.4s ease 0s',
        backgroundColor: '#ECECEC',
        overflow: 'hidden',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        textAlign: 'left',
        border: '1.6px solid #917243',
        borderRadius: '9.44283px',
        marginBottom: '20px',
        height: '100%',
        transform: transform,
        willChange: 'transform',
        '&:hover': {
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div style={{ marginRight: '20px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0px',
            textAlign: 'center',
            fontSize: '45px',
            lineHeight: '26px',
            color: '#917243',
            fill: '#917243'
          }}>
            <i className={`fas ${service.icon}`} aria-hidden="true"></i>
          </div>
        </div>
        
        <div>
          <Card.Title style={{
            fontSize: '23px',
            transition: 'all 0.4s ease 0s',
            color: '#917243',
            margin: '0px 0px 10px',
            fontFamily: 'Archivo, sans-serif',
            fontWeight: 500,
            lineHeight: '26px',
            letterSpacing: '-0.1px'
          }}>
            {service.title}
          </Card.Title>
          
          <Card.Text style={{
            transition: 'all 0.4s ease 0s',
            marginBottom: '10px',
            color: '#231f20',
            fontFamily: 'Archivo, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px'
          }}>
            {service.description}
          </Card.Text>
        </div>
      </div>
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
      }}>
        Our Services
      </h1>
      <Row>
      {servicesData && servicesData.length > 0 ? (
  servicesData.map((service) => (
    <Col key={service.id} lg={4} md={6} xs={12} className="mb-4">
      <ServiceCard service={service} />
    </Col>
  ))
) : (
  <p>No services found.</p>
)}
      </Row>
    </Container>
  );
};
export default ServicesPage;