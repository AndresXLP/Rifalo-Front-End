import { Card, Button, Modal, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './AllViews.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  clear,
  clearStatus,
  deleteRaffle,
  getRaffleById,
  selectRaffles,
  updateRaffleNumber,
} from '../Store/raffleSlicer/raffle.slice';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Image, Transformation } from 'cloudinary-react';

const MySwal = withReactContent(Swal);
const cloudName = process.env.REACT_APP_CLOUD_NAME;

export const HomeRifa = ({ isAuth }) => {
  let isOwner = false;
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { raffle, loading, raffleReserved, status } =
    useSelector(selectRaffles);

  const notify = () => toast.success('Link Copiado');

  const { productRaffle, descriptionRaffle, date, image } = raffle;
  if (isAuth) {
    if (isAuth._id === raffle.createdBy) {
      isOwner = true;
    }
  }
  useEffect(() => {
    dispatch(clearStatus());
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
  const handleDeleteRaffle = () => {
    MySwal.fire({
      html: `Esta seguro que desea eliminar su Rifa.<br />Esta Accion es <strong>IRREVERSIBLE</strong>`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      showConfirmButton: true,
      confirmButtonText: 'ELIMINAR RIFA',
      confirmButtonColor: 'red',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteRaffle(id));
      }
    });
  };
  status === 'Not Found' &&
    MySwal.fire('La Rifa ya no se encuentra disponible').then(() => {
      dispatch(clearStatus());
      navigate('/');
    });
  status === 'Deleted' &&
    MySwal.fire('Rifa eliminada con exito').then(() => {
      dispatch(clearStatus());
      navigate('/');
    });
  status === 'Do not Delete' &&
    MySwal.fire('La Rifa no puede ser eliminada. Ya tiene Numeros Reservados');

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
      {raffle && (
        <div>
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
                            <div>
                              <Image
                                cloudName={cloudName}
                                publicId={`${image}.jpg`}
                              >
                                <Transformation width="450" crop="scale" />
                              </Image>
                              <em>
                                <strong>Imagen de Referencia</strong>
                              </em>
                            </div>
                          ),
                        })
                      }
                    >
                      Ver Imagen
                    </Button>
                    <Button
                      className="ms-1 me-1"
                      variant="primary"
                      onClick={() => {
                        notify();
                        navigator.clipboard.writeText(
                          `https://rifalo-app.netlify.app/rifa/${raffle._id}`
                        );
                      }}
                    >
                      Compartir Link
                    </Button>
                    {isOwner && (
                      <Button
                        className="ms-1"
                        variant="danger"
                        onClick={handleDeleteRaffle}
                      >
                        Eliminar Rifa
                      </Button>
                    )}
                    <ToastContainer position="top-right" autoClose={2000} />
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
                  {raffle && raffle.numbers && (
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
          <div className="row mt-3">
            <div className="col">
              {isOwner && (
                <Card>
                  <Card.Header className="text-center">
                    <em>
                      <strong>Listado de compradores</strong>
                    </em>
                  </Card.Header>
                  <Card.Body className="my-custom-scrollbar">
                    <Table bordered hover responsive size="sm">
                      <thead>
                        <tr className="text-center">
                          <th>Numero</th>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Correo</th>
                          <th>Telefono</th>
                        </tr>
                      </thead>
                      <tbody>
                        {raffle.numbers &&
                          raffle.numbers.map((num, idx) => (
                            <tr
                              key={idx}
                              className={`text-center
                             ${
                               (num.selected && !num.payment && `bg-warning`) ||
                               (num.selected && num.payment && `bg-success`)
                             }
                             
                             bg-opacity-25`}
                            >
                              <td>{num.raffleNumber}</td>
                              <td>{num.name}</td>
                              <td>{num.lastName}</td>
                              <td>{num.email}</td>
                              <td>{num.phone}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
