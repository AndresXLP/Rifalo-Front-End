import { InputGroup, FormControl, Form, Button } from 'react-bootstrap';

export const CrearRifa = () => {
  return (
    <div className="container mt-5">
      <h3 className="text-center">Que vas a Rifar...</h3>
      <div className="row">
        <div className="col-8 text-center align-content-center">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Producto"
              aria-label="Producto"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text>Descripcion:</InputGroup.Text>
            <FormControl
              as="textarea"
              aria-label="With textarea"
              placeholder="Describe lo mas detallado posible el producto que vas a rifar"
            />
          </InputGroup>

          <InputGroup className="mb-3 mt-3">
            <InputGroup.Text id="basic-addon3">
              Valor del Numero $
            </InputGroup.Text>
            <FormControl
              id="basic-url"
              aria-describedby="basic-addon3"
              type="Number"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Select aria-label="Default select example">
              <option selected disabled>
                Juega con...
              </option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <InputGroup.Text id="basic-addon3">Juega el dia</InputGroup.Text>
            <FormControl
              id="basic-url"
              aria-describedby="basic-addon3"
              type="Date"
            />
          </InputGroup>
          <Button>Crear Rifa</Button>
        </div>
      </div>
    </div>
  );
};
