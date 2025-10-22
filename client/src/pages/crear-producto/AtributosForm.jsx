export default function AtributosForm({ form, handleChange }) {
  return (
    <div className="form__atributos">
      <h2>Atributos</h2>

      <label>Características</label>
      <input
        type="text"
        name="caracteristicas"
        value={form.caracteristicas}
        onChange={handleChange}
      />

      <label>Color</label>
      <input
        type="text"
        name="color"
        value={form.color}
        onChange={handleChange}
      />

      <label>Estructura</label>
      <input
        type="text"
        name="estructura"
        value={form.estructura}
        onChange={handleChange}
      />

      <label>Materiales</label>
      <input
        type="text"
        name="materiales"
        value={form.materiales}
        onChange={handleChange}
      />

      <label>Medidas</label>
      <input
        type="text"
        name="medidas"
        value={form.medidas}
        onChange={handleChange}
      />
    </div>
  );
}
