import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import api from '../api/api';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../Context/AuthContext.js';


const LoginModal = ({ show, onClose, onSwitchToSignup }) => {
  const {setAuthToken} = useAuth();
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState({
    type: '',
    text: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const validate = () => {
    if (!data.email || !data.password) {
      setMessage({ type: 'error', text: 'Email and password are required' });
      return false;
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(data.email)) {
      setMessage({ type: 'error', text: 'Invalid email format' });
      return false;
    }
    if (data.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run validation before making the API call
    if (!validate()) return;

    try {
      const res = await api.post('auth/login', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res && res.status === 200) {
        setMessage({
          type: 'success',
          text: 'Login successful!'
        });

        setAuthToken(res.data.token);
        
        onClose(); // close the modal to navigate 
        
        navigate("/");

    } else {
        setMessage({
          type: 'error',
          text: 'Login failed. Please try again later'
        });
      }
    } catch (error) {
      console.log(error)
      setMessage({
        type: 'error',
        text: 'An error occurred while logging in. Please try again.'
      });
    }
  };

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

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={{fontWeight:'bolder'}}>Email</Form.Label>
                <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 'bolder' }}>Password</Form.Label>
                <InputGroup>
                  <Form.Control 
                    onChange={handleChange} 
                    name="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                  />
                  <InputGroup.Text onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                    {showPassword ? <EyeSlash /> : <Eye />}
                  </InputGroup.Text>
                </InputGroup>
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

              {message.text && (
                <div className={`alert ${message.type === 'error' ? "alert-danger" : "alert-success"} mt-3`} role="alert">
                  {message.text}
                </div>
              )}

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
