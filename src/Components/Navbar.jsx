import React from 'react';
import logo from '../image/logo.png';
import './AllComponents.css';
import { Container, Nav, Navbar } from 'react-bootstrap';

export const Navbar2 = () => {
  return (
    <div>
      <Navbar bg="success" variant="success">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Rifalo App Logo" className="logo brillo" />
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/sessionlogin" className="text-light">
              Iniciar Sesion
            </Nav.Link>
            <Nav.Link href="/registro" className="text-light">
              Registrate
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
