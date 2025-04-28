import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';

const SignupModal = ({ show, onClose, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Body className="p-0">
        <Row className="g-0">
          <Col md={6} className="bg" style={{
            minHeight: '350px',
            backgroundColor: '#917243',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <h3 className="text-white">Join Us!</h3>
          </Col>

          <Col md={6} className="p-4 position-relative">
            <button 
              onClick={onClose}
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
              <Form.Group className="mb-3">
                <Form.Label style={{fontWeight:'bolder'}}>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{fontWeight:'bolder'}}>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{fontWeight:'bolder'}}>Phone Number</Form.Label>
                <Form.Control type="tel" placeholder="Enter phone number" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{fontWeight:'bolder'}}>Password</Form.Label>
                <InputGroup>
                  <Form.Control type={showPassword ? "text" : "password"} placeholder="Enter password" />
                  <InputGroup.Text onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{fontWeight:'bolder'}}>Confirm Password</Form.Label>
                <InputGroup>
                  <Form.Control type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" />
                  <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: 'pointer' }}>
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <div className="d-grid gap-2 mb-3">
                <Button variant="primary" type="submit" style={{ backgroundColor: '#917243', border: 'none' }}>
                  Sign Up
                </Button>
              </div>

              <div className="d-grid gap-2">
                <Button variant="outline-secondary" type="button" onClick={onSwitchToLogin}>
                  Already have an account? Login
                </Button>
              </div>

              <p className="text-muted small mt-2 text-center">
                By signing up, you agree to our Terms and Conditions
              </p>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default SignupModal;
