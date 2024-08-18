import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="border-top footer text-muted py-2">
      <Container className="d-flex justify-content-between align-items-center">
        <span>&copy; 2024 - Taller Front-End</span>
        <a href="#" className="text-muted">Nro Estudiante: 229019</a>
      </Container>
    </footer>
  );
  
}

export default Footer