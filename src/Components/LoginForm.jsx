import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import loginImage from '../image/Backgroun-session-login.png';
import { signIn } from '../Store/userSlicer/user.slice';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const initialState = {
    email: '',
    password: '',
  };
  const [formValues, setFormValues] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const hadleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(formValues));
  };
  return (
    <div className="container text-center mt-5">
      <h2 className="text-center mb-5">
        <strong>
          <em>Inicia Sesion</em>
        </strong>
      </h2>
      <div className="row mt-5">
        <div className="col-5 mt-5">
          <Form onSubmit={hadleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.FloatingLabel>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="Ingresa tu Correo"
                  id="floatingInputCustom"
                  onChange={handleChange}
                />
                <label htmlFor="floatingInputCustom">Ingresa tu Correo</label>
              </Form.FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.FloatingLabel>
                <Form.Control
                  required
                  minLength={4}
                  id="floatingPasswordCustom"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <label htmlFor="floatingPasswordCustom">
                  Ingresa tu Contraseña
                </label>
              </Form.FloatingLabel>
            </Form.Group>
            <Button variant="primary" type="submit" className="col-12">
              Iniciar Sesion
            </Button>
          </Form>
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
