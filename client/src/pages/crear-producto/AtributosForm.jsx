import { useState, useEffect } from "react";

export default function AtributosForm({ form, handleChange }) {
  const [largo, setLargo] = useState("");
  const [alto, setAlto] = useState("");
  const [ancho, setAncho] = useState("");

  useEffect(() => {
    // Filtramos solo las medidas válidas (no vacías ni cero)
    const medidasValidas = [
      largo && Number(largo) > 0 ? `${largo}` : null,
      alto && Number(alto) > 0 ? `${alto}` : null,
      ancho && Number(ancho) > 0 ? `${ancho}` : null,
    ].filter(Boolean);

    const medidasString =
      medidasValidas.length > 0 ? `${medidasValidas.join(" x ")} cm` : "";

    handleChange({
      target: {
        name: "medidas",
        value: medidasString,
      },
    });
  }, [largo, alto, ancho]);

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

      <label>Medidas [cm]</label>
      <div className="form__medidas">
        <input
          type="number"
          name="largo"
          value={largo}
          min={0}
          onChange={(e) => setLargo(e.target.value)}
          placeholder="Largo"
        />
        <input
          type="number"
          name="alto"
          value={alto}
          min={0}
          onChange={(e) => setAlto(e.target.value)}
          placeholder="Alto"
        />
        <input
          type="number"
          name="ancho"
          value={ancho}
          min={0}
          onChange={(e) => setAncho(e.target.value)}
          placeholder="Ancho"
        />
      </div>
    </div>
  );
}
