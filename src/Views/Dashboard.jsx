import './AllViews.css';
import placeholderImage from '../image/placeholder-513.webp';
import { useEffect } from 'react';
import { Card, Button, Row, Col, Placeholder } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  clearStatus,
  getMyRaffle,
  selectRaffles,
} from '../Store/raffleSlicer/raffle.slice';
import { Image, Transformation } from 'cloudinary-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { logout } from '../Store/userSlicer/user.slice';
const MySwal = withReactContent(Swal);

const cloudName = process.env.REACT_APP_CLOUD_NAME;
export const Dashboard = () => {
  const raffleState = useSelector(selectRaffles);
  const { loading, raffles, status } = raffleState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearStatus());
    setTimeout(() => {
      dispatch(getMyRaffle());
    }, 1500);
  }, [dispatch]);
  useEffect(() => {
    if (status === 'token expired') {
      MySwal.fire('Su sesión expiro');
      dispatch(logout());
    }
  }, [dispatch, status]);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-5 text-center">Dashboard Rifas Activas</h1>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            {status === 'Not Found' && (
              <div className="text-center">
                <h3 className="mt-3">No has Creado Rifas</h3>
                <Link to={`/crear-rifa`}>
                  <Button>Crea una nueva Aqui</Button>
                </Link>
              </div>
            )}
            <Row xs={2} md={4} className="g-4">
              {loading &&
                Array.from({ length: 4 }).map((_, idx) => (
                  <Col key={idx}>
                    <Card className="p-2 m">
                      <Card.Img variant="top" src={placeholderImage} />
                      <Card.Body>
                        <Placeholder as={Card.Title} animation="glow">
                          <Placeholder xs={6} />
                        </Placeholder>
                        <Placeholder as={Card.Text} animation="glow">
                          <Placeholder xs={7} /> <Placeholder xs={4} />{' '}
                          <Placeholder xs={4} /> <Placeholder xs={6} />{' '}
                          <Placeholder xs={8} />
                        </Placeholder>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              {raffles &&
                raffles.map((item, idx) => (
                  <Link
                    key={idx}
                    to={`/rifa/${item._id}`}
                    className="rifa-link"
                  >
                    <Col className="h-100" key={idx}>
                      <Card className="p-2 h-100 card-item">
                        <div className="image-card align-self-center">
                          <Image
                            cloudName={cloudName}
                            publicId={`${item.image}.jpg`}
                          >
                            <Transformation
                              height="188"
                              quality="100"
                              crop="fit"
                            />
                          </Image>
                        </div>
                        <Card.Body>
                          <Card.Title>
                            Se Rifa: <br />
                            <em>{item.productRaffle}</em>
                          </Card.Title>
                          <Card.Text>
                            Precio Numero: <em>{item.price}</em>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Link>
                ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};
