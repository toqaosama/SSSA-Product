import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const SplitPage = () => {
  return (
    <Container fluid style={{ height: '11vh' ,marginBottom:'1%',marginTop:'1%'}}>
      <Row style={{ height: '100%' }}>
        {/* Left Side - 50% width */}
        <Col md={3} style={{ height: '100%', backgroundColor: '#ECECEC' }}>
          <div style={{ height: '100%', padding: '1rem' ,textAlign:'center',justifyContent:'center' , justifyItems:'center' }}>
            {/* Other content for left side */}
           <h6 style={{fontSize:'40px' ,fontWeight:'bolder',color:'#231f20'}}>toqa</h6>
            {/* More content */}
          </div>
        </Col>
        
        {/* Right Side - 50% width */}
        <Col md={3} style={{ height: '100%', backgroundColor: '#ECECEC' }}>
          <div style={{ height: '100%', padding: '1rem' }}>
            {/* Content for right side */}
          </div>
        </Col>
         {/* Right Side - 50% width */}
         <Col md={3} style={{ height: '100%', backgroundColor: '#ECECEC' }}>
          <div style={{ height: '100%', padding: '1rem' }}>
            {/* Content for right side */}
          </div>
        </Col>
         {/* Right Side - 50% width */}
         <Col md={3} style={{ height: '100%', backgroundColor: '#ECECEC' }}>
          <div style={{ height: '100%', padding: '1rem' }}>
            {/* Content for right side */}
          </div>
        </Col>

      </Row>
    </Container>
  );
};

export default SplitPage;