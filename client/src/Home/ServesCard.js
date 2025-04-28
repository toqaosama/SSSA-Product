import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

// Define different animation directions for variety
const animationDirections = [
  { transform: 'translateY(-5px) rotate(2deg)' }, // up-right
  { transform: 'translateY(5px) rotate(-2deg)' }, // down-left
  { transform: 'translateX(-5px) rotate(-1deg)' }, // left-up
  { transform: 'translateX(5px) rotate(1deg)' }, // right-down
  { transform: 'translate(-5px, -5px) rotate(1.5deg)' }, // up-left
  { transform: 'translate(5px, 5px) rotate(-1.5deg)' } // down-right
];

const BrandIdentityCard = ({ index }) => {
  return (
    <Card 
      style={{
        position: 'relative',
        padding: '40px 34px 35px',
        transition: 'all 0.4s ease 0s',
        backgroundColor: '#ECECEC',
        overflow: 'hidden',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        textAlign: 'left',
        border: '1.6px solid #917243',
        borderRadius: '9.44283px',
        marginBottom: '20px',
        height: '100%',
        transform: 'translate(0, 0) rotate(0)',
        '&:hover': {
          transform: animationDirections[index % animationDirections.length].transform,
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }
      }}
      className="card-hover-animation" // We'll use this for the CSS
    >
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div style={{ marginRight: '20px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0px',
            textAlign: 'center',
            fontSize: '45px',
            lineHeight: '26px',
            color: '#917243',
            fill: '#917243'
          }}>
            <i aria-hidden="true"></i>
          </div>
        </div>
        
        <div>
          <Card.Title style={{
            fontSize: '23px',
            transition: 'all 0.4s ease 0s',
            color: '#917243',
            margin: '0px 0px 10px',
            fontFamily: 'Archivo, sans-serif',
            fontWeight: 500,
            lineHeight: '26px',
            letterSpacing: '-0.1px'
          }}>
            Brand Identity
          </Card.Title>
          
          <Card.Text style={{
            transition: 'all 0.4s ease 0s',
            marginBottom: '10px',
            color: '#231f20',
            fontFamily: 'Archivo, sans-serif',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '24px'
          }}>
            Logo, Business card, Letter head, Envelopes, Folder, ID, Flyer, Brochure, Catalogue
          </Card.Text>
          
          <Button 
            href="https://backlink-group.com/brand-identity/"
            style={{
              color: '#231f20',
              borderRadius: '6px',
              fontSize: '15px',
              padding: '14px 28px',
              display: 'inline-flex',
              alignItems: 'center',
              lineHeight: '24px',
              backgroundColor: '#231f20',
              backgroundImage: 'linear-gradient(#917243 0%, #917243 100%)',
              fontFamily: 'Archivo, sans-serif',
              fontWeight: 500,
              fill: '#917243',
              border: '1.6px groove #231f20',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 5px 15px rgba(145, 114, 67, 0.4)'
              }
            }}
            className="button-hover-animation"
          >
            More Details <i aria-hidden="true" style={{ marginLeft: '5px' }}></i>
          </Button>
        </div>
      </div>
    </Card>
  );
};

const CardsPage = () => {
  return (
    <Container>
      <h1 style={{
        textAlign: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        fontWeight: 'bolder',
        color: '#917243',
        marginTop: '2%',
        marginBottom: '2%'
      }}>
        Our Services
      </h1>
      <Row>
        {[...Array(6)].map((_, index) => (
          <Col key={index} md={4} className="mb-4">
            <BrandIdentityCard index={index} />
          </Col>
        ))}
      </Row>
      
      {/* Add CSS for animations */}
      <style jsx>{`
        .card-hover-animation {
          transition: all 0.3s ease-out;
        }
        .card-hover-animation:hover {
          transform: ${animationDirections[0].transform};
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          z-index: 10;
        }
        .button-hover-animation:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(145, 114, 67, 0.4);
        }
        /* Apply different animations based on card position */
        .mb-4:nth-child(1) .card-hover-animation:hover {
          transform: translateY(-5px) rotate(2deg);
        }
        .mb-4:nth-child(2) .card-hover-animation:hover {
          transform: translateY(5px) rotate(-2deg);
        }
        .mb-4:nth-child(3) .card-hover-animation:hover {
          transform: translateX(-5px) rotate(-1deg);
        }
        .mb-4:nth-child(4) .card-hover-animation:hover {
          transform: translateX(5px) rotate(1deg);
        }
        .mb-4:nth-child(5) .card-hover-animation:hover {
          transform: translate(-5px, -5px) rotate(1.5deg);
        }
        .mb-4:nth-child(6) .card-hover-animation:hover {
          transform: translate(5px, 5px) rotate(-1.5deg);
        }
      `}</style>
    </Container>
  );
};

export default CardsPage;