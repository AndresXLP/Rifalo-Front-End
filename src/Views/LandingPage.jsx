import { Card, Button, Row, Col } from 'react-bootstrap';

export const LandingPage = () => {
  return (
    <div className="container position-relative">
      <div className="row position-absolute top-0 start-50 translate-middle-x">
        <div className="col">
          <h1 className="mt-5 text-center">Rifas Activas</h1>
        </div>
        <div className="row mt-3">
          <div className="col">
            <Row xs={1} md={2} className="g-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Col>
                  <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                      <Card.Title>Card title</Card.Title>
                      <Card.Text>
                        This is a longer card with supporting text below as a
                        natural lead-in to additional content. This content is a
                        little bit longer.
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
