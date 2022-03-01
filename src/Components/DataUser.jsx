export const DataUser = ({ handleChange }) => {
  return (
    <div>
      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text">Nombre</span>
        <input
          type="text"
          name="name"
          onChange={() => handleChange()}
          className="form-control"
        />
        <span className="input-group-text">Apellido</span>
        <input
          type="text"
          name="lastName"
          onChange={() => handleChange()}
          className="form-control"
        />
      </div>
      <div className="input-group input-group-sm mb-3">
        <span className="input-group-text">Correo</span>
        <input
          type="text"
          name="email"
          onChange={() => handleChange()}
          className="form-control"
        />
        <span className="input-group-text">Telefono</span>
        <input
          type="text"
          name="phone"
          onChange={() => handleChange()}
          className="form-control"
        />
      </div>
    </div>
  );
};
