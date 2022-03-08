import React from 'react';
import logo from '../image/logo.png';
import './AllComponents.css';
import { Container, Nav, Navbar } from 'react-bootstrap';

export const Navbar2 = ({ isAuth }) => {
  console.log(`🤖 ~ file: Navbar.jsx ~ line 7 ~ Navbar2 ~ isAuth`, isAuth);
  const logout = () => {
    window.localStorage.clear();
  };
  return (
    <div>
      <Navbar bg="success" variant="success">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Rifalo App Logo" className="logo brillo" />
          </Navbar.Brand>

          {isAuth ? (
            <Nav className="ms-auto">
              <Nav.Link href="/dashboard" className="text-light">
                Mis Rifas Activas
              </Nav.Link>
              <Nav.Link href="/crear-rifa" className="text-light">
                Crear Nueva Rifa
              </Nav.Link>
              <Nav.Link
                onClick={logout}
                href="/registro"
                className="text-light"
              >
                Cerrar Session
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link href="/sessionlogin" className="text-light">
                Iniciar Sesion
              </Nav.Link>
              <Nav.Link href="/registro" className="text-light">
                Registrate
              </Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </div>
  );
};
