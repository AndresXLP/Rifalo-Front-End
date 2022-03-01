import { Form, Button } from 'react-bootstrap';
import loginImage from '../image/Backgroun-session-login.png';

export const LoginForm = () => {
  return (
    <div className="container text-center mt-5">
      <h2 className="text-center mb-5">
        <strong>
          <em>Inicia Sesion</em>
        </strong>
      </h2>
      <div className="row mt-5">
        <div className="col-5 mt-5">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.FloatingLabel>
              <Form.Control
                type="email"
                placeholder="Ingresa tu Correo"
                id="floatingInputCustom"
              />
              <label htmlFor="floatingInputCustom">Ingresa tu Correo</label>
            </Form.FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.FloatingLabel>
              <Form.Control
                id="floatingPasswordCustom"
                type="password"
                placeholder="Password"
              />
              <label htmlFor="floatingPasswordCustom">
                Ingresa tu Contraseña
              </label>
            </Form.FloatingLabel>
          </Form.Group>
          <Button variant="primary" type="submit" className="col-12">
            Iniciar Sesion
          </Button>
        </div>
        <div className="col-2"></div>
        <div className="col-5">
          <img
            src={loginImage}
            alt="Imagen Inicio de Session"
            className="session-login"
          />
        </div>
      </div>
    </div>
  );
};
