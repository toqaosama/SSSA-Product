import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import './style/RegisterModal.css'; // Import the CSS file

const SignupModal = ({ show, onClose, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Modal 
      show={show} 
      onHide={onClose} 
      centered 
      dialogClassName="signup-modal"
    >
      <Modal.Body className="p-0">
        <Row className="g-0">
          <Col md={6} className="modal-left-side">
            <h3 className="text-white">Join Us!</h3>
          </Col>

          <Col md={6} className="modal-right-side">
            <button 
              onClick={onClose}
              className="modal-close-btn"
            >
              &times;
            </button>

            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="form-label">Username</Form.Label>
                <Form.Control type="text" placeholder="Enter username" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="form-label">Phone Number</Form.Label>
                <Form.Control type="tel" placeholder="Enter phone number" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="form-label">Password</Form.Label>
                <InputGroup>
                  <Form.Control type={showPassword ? "text" : "password"} placeholder="Enter password" />
                  <InputGroup.Text 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="password-toggle"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="form-label">Confirm Password</Form.Label>
                <InputGroup>
                  <Form.Control type={showConfirmPassword ? "text" : "password"} placeholder="Confirm password" />
                  <InputGroup.Text 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                    className="password-toggle"
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <div className="d-grid gap-2 mb-3">
                <Button variant="primary" type="submit" className="signup-btn">
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