import './AllComponents.css';
import { Button, Form, FormControl, InputGroup, Card } from 'react-bootstrap';
import background from '../image/Background-register-page.png';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clear, selectUser, signUp } from '../Store/userSlicer/user.slice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const RegistForm = () => {
  const { loading, status, message } = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [valueForms, setValueForms] = useState(initialValues);
  const [matchPass, setMatchPass] = useState(true);

  const handleChange = (e) => {
    setMatchPass(true);
    const { name, value } = e.target;
    setValueForms({ ...valueForms, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = valueForms;
    if (password !== confirmPassword) {
      setMatchPass(false);
    } else {
      setMatchPass(true);
      dispatch(signUp(valueForms));
    }
  };
  const registroAlert = () => {
    Swal.fire({
      icon: 'info',
      title: 'Registro de Usuario',
      text: message,
    }).then(() => {
      if (status === 'Success') {
        navigate('/sessionlogin');
        return;
      }
      dispatch(clear());
      setValueForms(initialValues);
    });
  };
  return (
    <div className="container">
      {message && registroAlert()}
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
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Tus Datos</InputGroup.Text>
                    <FormControl
                      required
                      value={valueForms.name}
                      minLength={3}
                      disabled={loading ? true : false}
                      name="name"
                      aria-label="First name"
                      placeholder="Nombre"
                      onChange={handleChange}
                    />
                    <FormControl
                      required
                      value={valueForms.lastName}
                      minLength={3}
                      disabled={loading ? true : false}
                      name="lastName"
                      aria-label="Last name"
                      placeholder="Apellido"
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    required
                    value={valueForms.email}
                    disabled={loading ? true : false}
                    name="email"
                    type="email"
                    placeholder="Correo Electronico"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    required
                    value={valueForms.password}
                    minLength={4}
                    disabled={loading ? true : false}
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    required
                    value={valueForms.confirmPassword}
                    minLength={4}
                    disabled={loading ? true : false}
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirmar Contraseña"
                    onChange={handleChange}
                  />
                  <p className="text-danger">
                    {valueForms.password !== '' &&
                      !matchPass &&
                      'Contraseñas no coinciden'}
                  </p>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Registrando Usuario' : 'Registrate'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
