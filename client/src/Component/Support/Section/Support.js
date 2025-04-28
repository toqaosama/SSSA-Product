import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Support = () => {
  return (
    <Container 
      className="my-5 p-4 rounded" 
      style={{
        backgroundColor: '#ECECEC',
        boxShadow: '0 4px 8px 0 rgba(145, 114, 67, 0.2), 0 6px 20px 0 rgba(145, 114, 67, 0.19)',
        transition: 'box-shadow 0.3s ease-in-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 16px 0 rgba(145, 114, 67, 0.3), 0 12px 25px 0 rgba(145, 114, 67, 0.29)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 8px 0 rgba(145, 114, 67, 0.2), 0 6px 20px 0 rgba(145, 114, 67, 0.19)';
      }}
    >
      <Row className="justify-content-center">
        <Col md={8} className="text-center mb-4">
          <h2 style={{fontWeight:'bolder', color:'#917243',marginTop:'2%'}}>Contact Support</h2>
          <p className="lead" style={{fontWeight:'bold', color: '#231f20'}}>We're here to help you with any questions or issues</p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6} className="mb-4">
          <div 
            className="p-4 rounded" 
            style={{ 
              color: '#231f20',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 8px 0 rgba(145, 114, 67, 0.2), 0 6px 20px 0 rgba(145, 114, 67, 0.19)',
              transition: 'box-shadow 0.3s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 16px 0 rgba(145, 114, 67, 0.3), 0 12px 25px 0 rgba(145, 114, 67, 0.29)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 8px 0 rgba(145, 114, 67, 0.2), 0 6px 20px 0 rgba(145, 114, 67, 0.19)';
            }}
          >
            <h4 className="mb-3">Support Information</h4>
            <p>
              <strong>Email:</strong> support@example.com<br />
              <strong>Phone:</strong> (123) 456-7890<br />
              <strong>Hours:</strong> Monday-Friday, 9AM-5PM
            </p>
            <p>
              For immediate assistance, please use the contact form or check our FAQ section.
            </p>
          </div>
        </Col>
        
        <Col md={6}>
          <div 
            className="p-4 rounded"
            style={{ 
              color: '#231f20',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 8px 0 rgba(145, 114, 67, 0.2), 0 6px 20px 0 rgba(145, 114, 67, 0.19)',
              transition: 'box-shadow 0.3s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 16px 0 rgba(145, 114, 67, 0.3), 0 12px 25px 0 rgba(145, 114, 67, 0.29)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 8px 0 rgba(145, 114, 67, 0.2), 0 6px 20px 0 rgba(145, 114, 67, 0.19)';
            }}
          >
            <Form>
              <Form.Group className="mb-3">
                <Form.Label style={{fontWeight:'bolder', color: '#917243'}}>Your Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your name" 
                  style={{borderColor: '#917243'}}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{fontWeight:'bolder', color: '#917243'}}>Email Address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter your email" 
                  style={{borderColor: '#917243'}}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{fontWeight:'bolder', color: '#917243'}}>Subject</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="What's this about?" 
                  style={{borderColor: '#917243'}}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{fontWeight:'bolder', color: '#917243'}}>Message</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4} 
                  placeholder="Describe your issue in detail" 
                  style={{borderColor: '#917243'}}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  type="submit" 
                  style={{ 
                    backgroundColor: '#917243', 
                    border: 'none',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#7a5f38';
                    e.currentTarget.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#917243';
                    e.currentTarget.style.boxShadow = '0 2px 4px 0 rgba(0, 0, 0, 0.1)';
                  }}
                >
                  Submit Request
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

      <Row className="mt-5 justify-content-center">
        <Col md={8} className="text-center">
          <h4 className="mb-3" style={{fontWeight:'bolder', color:'#917243'}}>Frequently Asked Questions</h4>
          <div className="text-start">
            <h5 style={{fontWeight:'bold', color:'#917243'}}>How do I reset my password?</h5>
            <p>Go to the login page and click "Forgot Password" to receive reset instructions via email.</p>
            
            <h5 style={{fontWeight:'bold', color:'#917243'}}>Where can I find my order history?</h5>
            <p>Log in to your account and navigate to the "My Orders" section in your dashboard.</p>
            
            <h5 style={{fontWeight:'bold', color:'#917243'}}>What's your return policy?</h5>
            <p>We accept returns within 30 days of purchase with original receipt. See our Returns page for details.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Support;