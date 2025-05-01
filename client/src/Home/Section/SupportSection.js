import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import '../Styles/SupportSection.css'; // We'll create this CSS file
import { Link } from 'react-router-dom';

const SupportSection = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = "We're here to help you with any questions or concerns you may have. Our support team is available 24/7 to assist you.";
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timer;
    
    if (isTyping) {
      if (displayText.length < fullText.length) {
        timer = setTimeout(() => {
          setDisplayText(fullText.substring(0, displayText.length + 1));
        }, 50); // Typing speed
      } else {
        timer = setTimeout(() => {
          setIsTyping(false);
        }, 2000); // Pause before deleting
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(fullText.substring(0, displayText.length - 1));
        }, 30); // Deleting speed
      } else {
        timer = setTimeout(() => {
          setIsTyping(true);
        }, 500); // Pause before retyping
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isTyping, fullText]);

  return (
    <Container fluid className="support-section">
      <div className="support-content">
        <h1 className="support-title">Call Our Support</h1>
        <p className="support-text">{displayText}</p>
        <Button 
          variant="outline-dark" 
          className="support-button"
          as={Link} to="/Support"
          style={{
            borderColor: '#231f20',
            color: '#231f20',
            backgroundColor: '#917243',
            marginBottom:'15%',marginTop:'-1%'
          }}
        >
          Contact Us
        </Button>
      </div>
    </Container>
  );
};

export default SupportSection;