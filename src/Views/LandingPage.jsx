import { useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
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
    dispatch(getAllRaffles());
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-5 text-center">Rifas Activas</h1>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <Row xs={1} md={2} className="g-4">
              {raffles.map((item, idx) => (
                <Col>
                  <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                      <Card.Title>
                        Se Rifa: <em>{item.productRaffle}</em>
                      </Card.Title>
                      <Card.Text>{item.descriptionRaffle}</Card.Text>
                      <Card.Text>
                        Precio Numero: <em>{item.price}</em>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};
