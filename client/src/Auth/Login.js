import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import SignupModal from './Register';
import { useLoginModal } from '../Hook/useLoginModal';

const LoginModal = ({ show, handleClose }) => {
  const [showSignup, setShowSignup] = useState(false);
  
  const handleSignupClick = () => {
    handleClose(); // Close the login modal first
    setShowSignup(true); // Then open the signup modal
  };

  return (
    <>
      <Modal 
        show={show} 
        onHide={handleClose} 
        centered 
        size="lg"
      >
        <Modal.Body className="p-0">
          <Row className="g-0">
            {/* Left Column with Custom Background */}
            <Col md={6} className="bg" style={{ 
              minHeight: '350px', 
              backgroundColor: 'rgba(114, 5, 5, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <h3 className="text-white">Welcome Back!</h3>
            </Col>

            {/* Right Column with Form */}
            <Col md={6} className="p-4 position-relative">
              {/* Close button positioned at top right */}
              <button 
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                &times;
              </button>
              
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{fontWeight:'bolder'}}>Username or Email</Form.Label>
                  <Form.Control type="text" placeholder="Enter username or email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={{fontWeight:'bolder'}}>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <div className="d-grid gap-2 mb-3">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    style={{ backgroundColor: 'rgba(114, 5, 5, 0.9)', border: 'none' }}
                  >
                    Login
                  </Button>
                </div>

                <div className="d-grid gap-2">
                  <Button 
                    variant="outline-secondary" 
                    type="button" 
                    onClick={handleSignupClick}
                  >
                    Sign Up
                  </Button>
                </div>

                <p className="text-muted small mt-2 text-center">
                  Don't have an account? Create one
                </p>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* Signup Modal - rendered separately */}
      <SignupModal show={showSignup} handleClose={() => setShowSignup(false)} />
    </>
  );
};

export default LoginModal;