import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../../Assetes/imgs/Logo.png';
import '../Styles/SplitPage.css'; // Create this CSS file for custom styles

const SplitPage = () => {
  return (
    <Container fluid className="split-page-container">
      <Row className="split-page-row">
        {[1, 2, 3, 4].map((item) => (
          <Col 
            key={item}
            md={3} 
            xs={6} // On extra small devices, show 2 columns per row (6 * 2 = 12)
            className="split-page-col"
          >
            <div className="logo-container">
              <img 
                src={Logo} 
                alt="Backlink Group" 
                className="logo-img"
              />
              <h6 className="logo-text"></h6>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SplitPage;