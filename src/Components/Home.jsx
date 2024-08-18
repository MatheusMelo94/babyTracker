import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => (
  <Container fluid className="p-4 d-flex align-items-center justify-content-center min-vh-100">
    <Row className="text-center">
      <Col>
        <h1 className="mb-4">¡Bienvenido a Baby Tracker!</h1>
        <p className="mb-4">La aplicación definitiva para seguir el crecimiento y desarrollo de tu bebé.</p>

      </Col>
    </Row>
  </Container>
);

export default Home;
