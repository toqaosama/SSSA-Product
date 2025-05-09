import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginModal from '../Auth/LoginModal';
import RegisterModal from '../Auth/RegisterModal'; 
import '../Style/Footer.css'
const Footer = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const openLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const openSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleSignupClick = (e) => {
    e.preventDefault(); // Prevent form submission
    openSignup();
  };

  return (
    <footer style={{ paddingTop: '80px', margin: 'auto', boxSizing: 'border-box', backgroundColor:'#ECECEC',marginTop:'6%' ,color:'#917243' }}>
    <Container>
      <Row style={{ padding: '20px 40px 12px', borderTop: '0px none #231f20' }}>
        <Col md={3}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, height: '20px', margin: '5px 0 20px' }}>
            <strong>Our Services</strong>
          </h3>
          <ul style={{ maxHeight: '140px', padding: 0, transition: 'max-height 0.6s ease', margin: 0, overflow: 'hidden' }}>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/Sales/:id" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Brand Identity</Link>
            </li>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/Sales/:id" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Printing</Link>
            </li>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/Sales/:id" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Digital Marketing</Link>
            </li>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/Sales/:id" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Graphic Design</Link>
            </li>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/Sales/:id" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Video Production</Link>
            </li>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Social Media</Link>
            </li>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/Sales/:id" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Advertising</Link>
            </li>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/Sales/:id" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Billboards</Link>
            </li>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/Sales/:id" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Packaging</Link>
            </li>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/Sales/:id" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Strategy</Link>
            </li>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/Sales/:id" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Promotions</Link>
            </li>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/Sales/:id" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Outdoors</Link>
            </li>
          </ul>
        </Col>
        
        <Col md={3}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, height: '20px', margin: '5px 0 20px' }}>
            <strong>CORPORATE INFO</strong>
          </h3>
          <ul style={{ padding: 0, maxHeight: '100%', transition: 'max-height 0.6s ease', margin: 0, overflow: 'hidden' }}>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/BehindStory" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>About Us</Link>
            </li>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/Orders" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Delivery Information</Link>
            </li>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/Categores" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>OUR Filed</Link>
            </li>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/Sales" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Sales</Link>
            </li>
          </ul>
        </Col>
        
        <Col md={3}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, height: '20px', margin: '5px 0 20px' }}>
            <strong>HELP</strong>
          </h3>
          <ul style={{ padding: 0, maxHeight: '100%', transition: 'max-height 0.6s ease', margin: 0, overflow: 'hidden' }}>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/BehindStory" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>HELP </Link>
            </li>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <Link as={Link} to="/Support" style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Contact Us</Link>
            </li>
            <li style={{ listStyleType: 'none', paddingBottom: '4px' }}>
              <a href='https://maps.app.goo.gl/jX9t9boYt2Xdumox6' style={{ color: '#000', lineHeight: '18.2px', textDecoration: 'none' }}>Sitemap</a>
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
              
              </div>
                <Button className='Sign-Click' 
                  onClick={handleSignupClick}
                  // style={{ 
                  //   height: '48px', 
                  //   backgroundColor: '#231f20', 
                  //   display: 'flex', 
                  //   alignItems: 'center', 
                  //   justifyContent: 'center', 
                  //   width: '11rem', 
                  //   borderRadius: '0px', 
                  //   fontWeight: 600, 
                  //   border: '0.8px solid #231f20', 
                  //   padding: '12px 24px', 
                  //   whiteSpace: 'nowrap', 
                  //   overflow: 'hidden', 
                  //   textOverflow: 'ellipsis'  ,
                    
                  // }}
                >
                  Sign up
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>

      {/* Modals */}
      <LoginModal 
        show={showLogin} 
        onClose={closeModals} 
        onSwitchToSignup={openSignup}
      />
      <RegisterModal 
        show={showSignup} 
        onClose={closeModals} 
        onSwitchToLogin={openLogin}
      />
    </footer>
  );
};

export default Footer;