import React from 'react';
import logo from '../image/logo.png';
import './AllComponents.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export const Navbar2 = ({ isAuth }) => {
  console.log(`🤖 ~ file: Navbar.jsx ~ line 7 ~ Navbar2 ~ isAuth`, isAuth);
  const logout = () => {
    window.localStorage.clear();
  };
  return (
    <div>
      <Navbar bg="success" variant="success">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img src={logo} alt="Rifalo App Logo" className="logo brillo" />
            </Link>
          </Navbar.Brand>

          {isAuth ? (
            <Nav className="ms-auto">
              <Nav.Link>
                <Link
                  to="/dashboard"
                  className="text-light text-decoration-none ms-2 me-2"
                >
                  Mis Rifas Activas
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/crear-rifa"
                  className="text-light text-decoration-none ms-2 me-2"
                >
                  Crear Nueva Rifa
                </Link>
              </Nav.Link>
              <Nav.Link
                onClick={logout}
                href="/"
                className="text-light text-decoration-none ms-2 me-2"
              >
                Cerrar Session
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link>
                <Link
                  to="/sessionlogin"
                  className="text-light text-decoration-none ms-2 me-2"
                >
                  Iniciar Sesion
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link
                  to="/registro"
                  className="text-light text-decoration-none ms-2 me-2"
                >
                  Registrate
                </Link>
              </Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </div>
  );
};
