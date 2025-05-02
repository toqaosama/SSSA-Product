import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from '../../Assetes/imgs/Logo.png'

const SplitPage = () => {
  return (
    <Container fluid style={{ height: '11vh', marginBottom: '1%', marginTop: '0%' }}>
    <hr style={{
  height: '11px',
  backgroundColor: '#111', // Very dark black
  border: 'none',
  margin: '20px 0'
}} />
    </Container>
  );
};

export default SplitPage;