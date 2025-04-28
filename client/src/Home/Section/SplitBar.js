import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../../Assetes/imgs/Logo.png'

const SplitPage = () => {
  return (
    <Container fluid style={{ height: '11vh', marginBottom: '1%', marginTop: '0%' }}>
      <Row style={{ height: '100%' }}>
        {/* Left Side - 25% width (since you have 4 columns) */}
        <Col md={3} style={{ 
          height: '100%', 
          backgroundColor: '#231f20',
          display: 'flex',
          alignItems: 'center', // Vertically center items
          justifyContent: 'center' // Horizontally center items
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem' // Adds space between the h6 and img
          }}>
           
            <img 
              src={Logo} 
              alt="Backlink Group" 
              width="100"
              className="logo-img"
            />
            <h6 style={{ fontSize: '30px', fontWeight: '', color: '#917243', margin: 0 }}>toqa</h6>
          </div>
        </Col>
        
        {/* Other columns remain the same */}
        <Col md={3} style={{ height: '100%', backgroundColor: '#231f20' }}>
          <div style={{ height: '100%', padding: '1rem' }}>
            {/* Content for right side */}
          </div>
        </Col>
        <Col md={3} style={{ height: '100%', backgroundColor: '#231f20' }}>
          <div style={{ height: '100%', padding: '1rem' }}>
            {/* Content for right side */}
          </div>
        </Col>
        <Col md={3} style={{ height: '100%', backgroundColor: '#231f20' }}>
          <div style={{ height: '100%', padding: '1rem' }}>
            {/* Content for right side */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SplitPage;