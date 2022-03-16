import { useEffect, useState } from 'react';
import { InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearStatus,
  createRaflle,
  selectRaffles,
} from '../Store/raffleSlicer/raffle.slice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const chance = [
  'Antioqueñita Día',
  'Dorado Mañana',
  'Cafeterito Tarde',
  'Fantástica Día',
  'Paisita Día',
  'Chontico Día',
  'Samán de la Suerte',
  'Pijao de Oro',
  'Astro Sol',
  'La Culona Día',
  'Sinuano Día',
  'La Caribeña Día',
  'Motilón Tarde',
  'Dorado Tarde',
  'Antioqueñita Tarde',
  'Paisita Noche',
  'Chontico Noche',
  'Motilón Noche',
  'Fantástica Noche',
  'Cafeterito Noche',
  'La Caribeña Noche',
  'Sinuano Noche',
  'Astro Luna',
  'Dorado Noche',
  'Paisa Lotto',
  'La Culona Noche',
];

const fecha = new Date(Date.now());
const hoy = fecha.toISOString().substring(0, 10);

const MySwal = withReactContent(Swal);

export const CrearRifa = () => {
  const { idRaffle } = useSelector(selectRaffles);
  console.log(
    `🤖 ~ file: CrearRifa.jsx ~ line 41 ~ CrearRifa ~ idRaffle`,
    idRaffle
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearStatus());
  }, [dispatch]);
  const initialValues = {
    date: '',
    lottery: '',
    image: '',
    productRaffle: '',
    price: '',
    descriptionRaffle: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [file, setFile] = useState({ file: [] });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataFile = new FormData();
    dataFile.append('dataFile', file);
    dispatch(createRaflle({ dataFile, formValues }));
    MySwal.fire({
      icon: 'success',
      text: 'Creando Rifa, seras redirigido automaticamente.',
      showCloseButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      timerProgressBar: true,
      timer: 3000,
    });
  };
  if (idRaffle) {
    setTimeout(() => {
      navigate(`/rifa/${idRaffle}`);
    }, 3000);
  }
  return (
    <div className="container mt-5 position-relative">
      <div className="row position-absolute top-0 start-50 translate-middle-x">
        <h3 className="text-center">Que vas a Rifar...</h3>
        <div className="col ">
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                required
                name="productRaffle"
                onChange={handleChange}
                value={formValues.productRaffle}
                placeholder="Breve descripcion. Ej: Celular, dinero, comida, bebida, etc..."
                maxLength={30}
                aria-label="Producto"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>Descripcion:</InputGroup.Text>
              <FormControl
                required
                name="descriptionRaffle"
                onChange={handleChange}
                value={formValues.descriptionRaffle}
                minLength={25}
                maxLength={255}
                as="textarea"
                aria-label="With textarea"
                placeholder="Describe lo mas detallado posible el producto que vas a rifar"
              />
            </InputGroup>
            <Form.Group controlId="formFileSm" className="mb-3">
              Sube una Imagen de lo que vas a rifar (Obligatorio)
              <Form.Control
                required
                type="file"
                size="sm"
                name="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </Form.Group>
            <InputGroup className="mb-3 mt-3">
              <InputGroup.Text id="basic-addon3">
                Valor del Numero $
              </InputGroup.Text>
              <FormControl
                required
                size="sm"
                min={2000}
                name="price"
                onChange={handleChange}
                value={formValues.price}
                id="basic-url"
                aria-describedby="basic-addon3"
                type="Number"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <Form.Select
                aria-label="Default select example"
                required
                name="lottery"
                onChange={handleChange}
                value={formValues.lottery}
              >
                <option value={''} disabled>
                  Juega con...
                </option>
                {chance.map((name, idx) => (
                  <option key={idx} value={name}>
                    {name}
                  </option>
                ))}
              </Form.Select>
              <InputGroup.Text id="basic-addon3">Juega el dia</InputGroup.Text>
              <FormControl
                required
                name="date"
                onChange={handleChange}
                value={formValues.date}
                id="basic-url"
                aria-describedby="basic-addon3"
                type="Date"
                min={hoy}
              />
            </InputGroup>
            <Button type="submit">Crear Rifa</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
