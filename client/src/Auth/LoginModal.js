import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const LoginModal = ({ show, onClose, onSwitchToSignup }) => {
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
            <h3 className="text-white">Welcome Back!</h3>
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
                <Form.Label style={{fontWeight:'bolder'}}>Username or Email</Form.Label>
                <Form.Control type="text" placeholder="Enter username or email" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{fontWeight:'bolder'}}>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <div className="d-grid gap-2 mb-3">
                <Button variant="primary" type="submit" style={{ backgroundColor: '#917243', border: 'none' }}>
                  Login
                </Button>
              </div>

              <div className="d-grid gap-2">
                <Button variant="outline-secondary" type="button" onClick={onSwitchToSignup}>
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
  );
};

export default LoginModal;
