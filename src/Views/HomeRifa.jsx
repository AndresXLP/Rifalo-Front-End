import { Card, Button, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './AllViews.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  clear,
  getRaffleById,
  selectRaffles,
  updateRaffleNumber,
} from '../Store/raffleSlicer/raffle.slice';
import { useParams } from 'react-router-dom';
const MySwal = withReactContent(Swal);

export const HomeRifa = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const { raffle, loading, raffleReserved } = useSelector(selectRaffles);
  console.log(`🤖 ~ file: HomeRifa.jsx ~ line 20 ~ HomeRifa ~ raffle`, raffle);
  const { productRaffle, descriptionRaffle, date, image } = raffle;
  useEffect(() => {
    dispatch(getRaffleById(id));
  }, [dispatch, id, raffleReserved]);

  const initialState = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    id: '',
    number: '',
  };
  const [numberData, setNumberData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNumberData({ ...numberData, [name]: value });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setNumberData(initialState);
    setShow(false);
  };
  const handleShow = (num) => {
    console.log(
      `🤖 ~ file: HomeRifa.jsx ~ line 46 ~ handleShow ~ num`,
      num.raffleNumber
    );
    setNumberData({
      ...numberData,
      id: raffle._id,
      number: num.raffleNumber,
    });

    setShow(true);
  };
  const handleSubmit = () => {
    dispatch(updateRaffleNumber(numberData));
    handleClose();
    MySwal.fire('Numero Reservado exitosamente').then(() => {
      dispatch(clear());
    });
  };

  return (
    <div className="container mt-3">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reservar el numero</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text">Nombre</span>
              <input
                type="text"
                required
                name="name"
                onChange={handleChange}
                className="form-control"
              />
              <span className="input-group-text">Apellido</span>
              <input
                type="text"
                required
                name="lastName"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text">Correo</span>
              <input
                type="email"
                required
                name="email"
                onChange={handleChange}
                className="form-control"
              />
              <span className="input-group-text">Telefono</span>
              <input
                type="number"
                required
                name="phone"
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={!loading ? handleSubmit : null}
            disabled={loading}
          >
            {loading ? 'Reservando...' : 'Reservar'}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row">
        <div className="col">
          {raffle && (
            <Card className="text-center">
              <Card.Header>Se Rifa...</Card.Header>
              <Card.Body>
                <Card.Title>{productRaffle}</Card.Title>
                <Card.Text>{descriptionRaffle}</Card.Text>
                <Button
                  className="me-1"
                  variant="primary"
                  onClick={() =>
                    MySwal.fire({
                      html: (
                        <em>
                          <strong>Imagen de Referencia</strong>
                        </em>
                      ),
                      imageUrl: image,
                      imageAlt: productRaffle,
                    })
                  }
                >
                  Ver Imagen
                </Button>
                <Button
                  className="ms-1"
                  variant="primary"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `http://localhost:3000/rifa/${raffle._id}`
                    )
                  }
                >
                  Compartir Link
                </Button>
              </Card.Body>
              <Card.Footer className="text-muted">
                Juega el dia{' '}
                <em>
                  <strong>{date && date.substring(0, 10)}</strong>
                </em>{' '}
                con las 2 Ultimas Cifras de{' '}
                <em>
                  <strong>{raffle.lottery}</strong>
                </em>
              </Card.Footer>
            </Card>
          )}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <Card>
            <Card.Header>
              <h4 className="text-center text-primary">
                Valor Numero: {raffle.price}
                <br />
                <button
                  disabled
                  className={`btn btn-success btn-sm m-1 boton-width col-2`}
                >
                  Numeros Disponibles
                </button>
                <button
                  disabled
                  className={`btn btn-danger btn-sm m-1 boton-width col-2`}
                >
                  Numeros Reservados
                </button>
              </h4>
            </Card.Header>
            <Card.Body>
              {raffle.numbers && (
                <div className="col">
                  {raffle.numbers.map((num) => (
                    <button
                      key={num.raffleNumber}
                      className={`btn ${
                        num.selected ? `btn-danger` : `btn-success`
                      } btn-sm m-1 boton-width`}
                      onClick={() => handleShow(num)}
                      disabled={num.selected}
                    >
                      {num.raffleNumber}
                    </button>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};
