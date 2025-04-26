import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Accordion } from 'react-bootstrap';

const SupportPopup = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeKey, setActiveKey] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to the login page and click 'Forgot Password' to receive reset instructions via email."
    },
    {
      question: "Where can I find my order history?",
      answer: "Log in to your account and navigate to the 'My Orders' section in your dashboard."
    },
    {
      question: "What's your return policy?",
      answer: "We accept returns within 30 days of purchase with original receipt. See our Returns page for details."
    }
  ];

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Body className="p-0">
        <button 
          onClick={onHide}
          className="position-absolute bg-transparent border-0"
          style={{
            top: '15px',
            right: '15px',
            fontSize: '1.5rem',
            zIndex: 1
          }}
        >
          ×
        </button>

        <Row className="g-0">
          {/* Left Side - Support Info */}
          <Col md={5} className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
            <h3 className="mb-4 fw-bold">Support Center</h3>
            
            <div className="d-flex align-items-start mb-4">
              <span className="me-3 mt-1">📧</span>
              <div>
                <h6 className="fw-bold">Email Support</h6>
                <p className="mb-0">support@example.com</p>
                <small className="text-muted">Response within 24 hours</small>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4">
              <span className="me-3 mt-1">📞</span>
              <div>
                <h6 className="fw-bold">Phone Support</h6>
                <p className="mb-0">(123) 456-7890</p>
                <small className="text-muted">Mon-Fri, 9AM-5PM EST</small>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4">
              <span className="me-3 mt-1">💬</span>
              <div>
                <h6 className="fw-bold">Live Chat</h6>
                <p className="mb-0">Available on our website</p>
                <small className="text-muted">Click the chat icon in the corner</small>
              </div>
            </div>

            <hr className="my-4" />

            <div>
              <h6 className="fw-bold mb-3">Quick Links</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#faq" className="text-decoration-none">FAQs</a></li>
                <li className="mb-2"><a href="#returns" className="text-decoration-none">Returns Policy</a></li>
                <li className="mb-2"><a href="#shipping" className="text-decoration-none">Shipping Info</a></li>
              </ul>
            </div>
          </Col>

          {/* Right Side - Form and FAQs */}
          <Col md={7} className="p-4">
            {submitted ? (
              <div className="text-center py-4">
                <span className="text-success mb-3" style={{ fontSize: '3rem' }}>✓</span>
                <h4>Thank You!</h4>
                <p>Your support request has been submitted. We'll respond within 24 hours.</p>
                <Button 
                  variant="outline-primary" 
                  onClick={() => {
                    setSubmitted(false);
                    onHide();
                  }}
                >
                  Close
                </Button>
              </div>
            ) : (
              <>
                <h4 className="mb-4">Contact Form</h4>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name" 
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email" 
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?" 
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Message</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={4} 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your issue in detail" 
                      required
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100"
                    style={{ backgroundColor: '#720505', border: 'none' }}
                  >
                    Submit Request
                  </Button>
                </Form>

                <div className="mt-4 pt-3" id="faq">
                  <h5 className="mb-3">Frequently Asked Questions</h5>
                  <Accordion activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
                    {faqs.map((faq, index) => (
                      <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>{faq.question}</Accordion.Header>
                        <Accordion.Body>{faq.answer}</Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default SupportPopup;