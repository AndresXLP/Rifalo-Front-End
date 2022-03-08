import './AllViews.css';
import placeholderImage from '../image/placeholder-513.webp';
import { useEffect } from 'react';
import { Card, Button, Row, Col, Placeholder } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getAllRaffles,
  selectRaffles,
} from '../Store/raffleSlicer/raffle.slice';

export const LandingPage = () => {
  const raffleState = useSelector(selectRaffles);
  const { loading, raffles } = raffleState;
  console.log(raffles);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllRaffles());
    }, 1500);
  }, [dispatch]);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-5 text-center">Rifas Activas</h1>
        </div>
        <div className="row mt-3">
          <div className="col-12">
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
              {raffles.map((item, idx) => (
                <Link key={idx} to={`/rifa/${item._id}`} className="rifa-link">
                  <Col key={idx}>
                    <Card className="p-2">
                      <Card.Img variant="top" src={item.image} />
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
