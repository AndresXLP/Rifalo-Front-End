import './AllComponents.css';
import { Button, Form, FormControl, InputGroup, Card } from 'react-bootstrap';
import background from '../image/Background-register-page.png';
import { useState } from 'react';

export const RegistForm = () => {
  const initialValues = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    validatePassword: true,
  };

  const [valueForms, setValueForms] = useState(initialValues);
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValueForms({ ...valueForms, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    if (valueForms.password !== valueForms.confirmPassword) {
      setValueForms({ ...valueForms, validatePassword: false });
      e.stopPropagation();
    } else {
      setValueForms({ ...valueForms, validatePassword: true });
    }
    setValidated(true);
  };
  return (
    <div className="container">
      <div className="row mt-5">
        <h1 className="text-center mb-5">
          <strong>
            <em>Registrate Gratis Aqui</em>
          </strong>
        </h1>
        <div className="col">
          <img
            src={background}
            alt="Fondo Indicaciones"
            className="banner-register-page"
          />
        </div>
        <div className="col">
          <Card>
            <Card.Header>
              <h4>
                <em>Formulario de Registro</em>
              </h4>
            </Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Tus Datos</InputGroup.Text>
                    <FormControl
                      required
                      name="name"
                      aria-label="First name"
                      placeholder="Nombre"
                      onChange={handleChange}
                    />
                    <FormControl
                      required
                      name="lastName"
                      aria-label="Last name"
                      placeholder="Apellido"
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Nombre y Apellido son Requeridos!
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    required
                    name="email"
                    type="email"
                    placeholder="Correo Electronico"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Correo es Requerido!
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    required
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Contraseña es Requerido!
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    required
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirmar Contraseña"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Contraseña es Requerida!
                  </Form.Control.Feedback>
                  {!valueForms.validatePassword && (
                    <p className="text-danger">Las Contraseñas no coinciden!</p>
                  )}
                </Form.Group>
                <Button variant="primary" type="submit">
                  Registrarme
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
