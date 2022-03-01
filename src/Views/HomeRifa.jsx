import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './AllViews.css';

const MySwal = withReactContent(Swal);
export const total = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
  60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
  79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97,
  98, 99,
];
export const HomeRifa = () => {
  const initialState = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
  };
  const [numberValue, setNumberValue] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNumberValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClick = (num) => {
    MySwal.fire({
      allowOutsideClick: false,
      title: `Reservar el Numero ${num} ${numberValue.name}`,
      text: `Nombre $`,
      html: (
        <div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text">Nombre</span>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="form-control"
            />
            <span className="input-group-text">Apellido</span>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text">Correo</span>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              className="form-control"
            />
            <span className="input-group-text">Telefono</span>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
      ),
    }).then(async () => {
      await MySwal.fire(`Nombre: ${numberValue.name}`);
    });
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <Card className="text-center">
            <Card.Header>Se Rifa...</Card.Header>
            <Card.Body>
              <Card.Title>Celular</Card.Title>
              <Card.Text>Informacion del Celular</Card.Text>
              <Button variant="primary">Ver Imagen</Button>
            </Card.Body>
            <Card.Footer className="text-muted">
              Juega el dia 25 de Febrero de 2022 / con las 2 Ultimas Cifras de
              la loteria de La Caribeña
            </Card.Footer>
          </Card>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          {total.map((num) => (
            <button
              key={num}
              className="btn btn-primary btn-sm m-1 boton-width"
              onClick={() => handleClick(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
