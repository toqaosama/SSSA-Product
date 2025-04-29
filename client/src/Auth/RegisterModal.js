import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.js';

const SignupModal = ({ show, onClose, onSwitchToLogin }) => {
  const { setAuthToken } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.name || !data.email || !data.phone || !data.password || !data.confirmPassword) {
      setMessage({ type: 'error', text: 'All fields are required' });
      return false;
    }
    if (!emailRegex.test(data.email)) {
      setMessage({ type: 'error', text: 'Invalid email format' });
      return false;
    }
    if (data.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return false;
    }
    if (data.password !== data.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await api.post('/auth/register', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password
      });

      if (res.data && res.data.userId) {
        setUserId(res.data.userId);
        setOtpStep(true);
        setMessage({ type: 'success', text: 'Registration successful. Enter the OTP sent to your phone/email.' });
      } else {
        setMessage({ type: 'error', text: 'Unexpected response from server.' });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: error?.response?.data?.message || 'Registration failed.' });
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/verify-otp', {
        userId,
        otp
      });

      if (res.data) {
        console.log(res.data)
        setAuthToken(res.data.token);
        setMessage({ type: 'success', text: 'Account verified successfully!' });
        onClose();
        navigate('/');
      } else {
        setMessage({ type: 'error', text: 'Invalid OTP or verification failed.' });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: error?.response?.data?.message || 'OTP verification failed.' });
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

            {!otpStep ? (
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                  <Form.Label style={{fontWeight:'bolder'}}>name</Form.Label>
                  <Form.Control name="name" value={data.name} onChange={handleChange} type="text" placeholder="Enter name" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{fontWeight:'bolder'}}>Email</Form.Label>
                  <Form.Control name="email" value={data.email} onChange={handleChange} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{fontWeight:'bolder'}}>Phone Number</Form.Label>
                  <Form.Control name="phone" value={data.phone} onChange={handleChange} type="tel" placeholder="Enter phone number" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{fontWeight:'bolder'}}>Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                    />
                    <InputGroup.Text onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                      {showPassword ? <EyeSlash /> : <Eye />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{fontWeight:'bolder'}}>Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      name="confirmPassword"
                      value={data.confirmPassword}
                      onChange={handleChange}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                    />
                    <InputGroup.Text onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: 'pointer' }}>
                      {showConfirmPassword ? <EyeSlash /> : <Eye />}
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

                {message.text && (
                  <div className={`alert ${message.type === 'error' ? "alert-danger" : "alert-success"} mt-3`} role="alert">
                    {message.text}
                  </div>
                )}

                <p className="text-muted small mt-2 text-center">
                  By signing up, you agree to our Terms and Conditions
                </p>
              </Form>
            ) : (
              <Form onSubmit={handleVerifyOtp}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 'bolder' }}>Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter the OTP you received"
                  />
                </Form.Group>

                <div className="d-grid gap-2 mb-3">
                  <Button variant="primary" type="submit" style={{ backgroundColor: '#917243', border: 'none' }}>
                    Verify OTP
                  </Button>
                </div>

                {message.text && (
                  <div className={`alert ${message.type === 'error' ? "alert-danger" : "alert-success"} mt-3`} role="alert">
                    {message.text}
                  </div>
                )}
              </Form>
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default SignupModal;
