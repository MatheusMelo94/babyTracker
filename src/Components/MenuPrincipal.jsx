import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../AuthContext';
// import { useEffect } from "react";



const MenuPrincipal = () => {
  const { esAutenticado, logout } = useAuth();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (localStorage.getItem("apiKey") !== null) {
  //     navigate("/dashboard");
  //   } })

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
        Baby Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            {!esAutenticado ? (
              <>
                <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
                <Nav.Link as={Link} to="/registro">Registrarse</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/logout" onClick={logout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuPrincipal;
