import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ paddingTop: '80px', margin: 'auto', boxSizing: 'border-box', backgroundColor:'#ddd',marginTop:'6%'  }}>
      <Container>
        <Row style={{ padding: '20px 40px 12px', borderTop: '0px none rgb(0, 0, 0)' }}>
          <Col md={3}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, height: '20px', margin: '5px 0 20px' }}>
              <strong>SHOP BY</strong>
            </h3>
            <ul style={{ maxHeight: '140px', padding: 0, transition: 'max-height 0.6s ease', margin: 0, overflow: 'hidden' }}>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Women</Link>
              </li>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>MEN</Link>
              </li>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Baby</Link>
              </li>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Kids</Link>
              </li>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Home</Link>
              </li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, height: '20px', margin: '5px 0 20px' }}>
              <strong>CORPORATE INFO</strong>
            </h3>
            <ul style={{ padding: 0, maxHeight: '100%', transition: 'max-height 0.6s ease', margin: 0, overflow: 'hidden' }}>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>About Us</Link>
              </li>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Delivery Information</Link>
              </li>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Terms and Conditions of Sale</Link>
              </li>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Website Terms & Conditions</Link>
              </li>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Privacy Policy</Link>
              </li>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Returns & Refunds</Link>
              </li>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Sustainability</Link>
              </li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, height: '20px', margin: '5px 0 20px' }}>
              <strong>HELP</strong>
            </h3>
            <ul style={{ padding: 0, maxHeight: '100%', transition: 'max-height 0.6s ease', margin: 0, overflow: 'hidden' }}>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>HELP CENTER</Link>
              </li>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Contact Us</Link>
              </li>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Sitemap</Link>
              </li>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Stores</Link>
              </li>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>H&M Home Furniture & Lighting</Link>
              </li>
              <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
                <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Gifting</Link>
              </li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h3 style={{ fontSize: '14px', color: '#282828', fontWeight: 400, height: '20px', margin: '5px 0 20px' }}>
              Become a member today and get exclusive benefits!
            </h3>
            <Form action="https://eg.hm.com/rest/egy_en/V1/newsletter/subscription" method="POST" noValidate>
              <Form.Group style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 5px' }}>
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '1.5px' }}>
                  <Form.Control 
                    type="email" 
                    placeholder="Enter your email address" 
                    required 
                    style={{ 
                      height: '48px', 
                      border: '0.8px solid #e4e4e4', 
                      fontFamily: '"hm slussen regular", "hm slussen regular fallback", "helvetica neue"', 
                      fontSize: '16px', 
                      paddingLeft: '8px' 
                    }} 
                  />
                </div>
                <Button 
                  type="submit" 
                  style={{ 
                    height: '48px', 
                    backgroundColor: '#222', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    width: '11rem', 
                    borderRadius: '0px', 
                    fontWeight: 600, 
                    border: '0.8px solid rgba(0, 0, 0, 0)', 
                    padding: '12px 24px', 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis' 
                  }}
                >
                  Sign up
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        
      
      </Container>
    </footer>
  );
};

export default Footer;