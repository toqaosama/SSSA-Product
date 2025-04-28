import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Support = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} className="text-center mb-4">
          <h2>Contact Support</h2>
          <p className="lead">We're here to help you with any questions or issues</p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6} className="mb-4">
          <div className="p-4 shadow-sm rounded" style={{ backgroundColor: 'rgba(114, 5, 5, 0.1)' }}>
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
          <div className="p-4 shadow-sm rounded">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label style={{fontWeight:'bolder'}}>Your Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{fontWeight:'bolder'}}>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{fontWeight:'bolder'}}>Subject</Form.Label>
                <Form.Control type="text" placeholder="What's this about?" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{fontWeight:'bolder'}}>Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Describe your issue in detail" />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" style={{ backgroundColor: 'rgba(114, 5, 5, 0.9)', border: 'none' }}>
                  Submit Request
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

      <Row className="mt-5 justify-content-center">
        <Col md={8} className="text-center">
          <h4 className="mb-3">Frequently Asked Questions</h4>
          <div className="text-start">
            <h5>How do I reset my password?</h5>
            <p>Go to the login page and click "Forgot Password" to receive reset instructions via email.</p>
            
            <h5>Where can I find my order history?</h5>
            <p>Log in to your account and navigate to the "My Orders" section in your dashboard.</p>
            
            <h5>What's your return policy?</h5>
            <p>We accept returns within 30 days of purchase with original receipt. See our Returns page for details.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Support;