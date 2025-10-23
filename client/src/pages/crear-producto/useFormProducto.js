import { useState, useEffect } from "react";

export default function useFormProducto() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    imagenUrl: "",
    precio: "",
    categoria: "seleccionar",
    stock: "",
    materiales: "",
    medidas: "",
    estructura: "",
    caracteristicas: "",
    color: "",
  });

  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState("");

  const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const postProducto = async (producto) => {
    const response = await fetch(`${url}/api/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });
    if (!response.ok) {
      const msg = await response.text();
      throw new Error(`Error HTTP ${response.status}: ${msg}`);
    }
    return await response.json();
  };

  const nombreRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,'-]{2,100}$/;
  const imagenRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;

  const validar = () => {
    let erroresTemp = {};

    if (!form.nombre.trim()) {
      erroresTemp.nombre = "El nombre es obligatorio";
    } else if (!nombreRegex.test(form.nombre)) {
      erroresTemp.nombre =
        "Ingrese un nombre válido (solo letras, números y espacios)";
    }

    if (!form.descripcion.trim()) {
      erroresTemp.descripcion = "La descripción es obligatoria";
    } else if (form.descripcion.length < 10) {
      erroresTemp.descripcion =
        "La descripción debe tener al menos 10 caracteres";
    }

    if (!form.imagenUrl.trim()) {
      erroresTemp.imagenUrl = "La URL de la imagen es obligatoria";
    } else if (!imagenRegex.test(form.imagenUrl)) {
      erroresTemp.imagenUrl =
        "Ingrese una URL válida que termine en .jpg, .png, etc.";
    }

    if (!form.precio) {
      erroresTemp.precio = "El precio es obligatorio";
    } else if (Number(form.precio) <= 0) {
      erroresTemp.precio = "El precio debe ser mayor que 0";
    }

    if (form.categoria === "seleccionar") {
      erroresTemp.categoria = "Seleccione una categoría";
    }

    if (form.stock === "") {
      erroresTemp.stock = "El stock es obligatorio";
    } else if (Number(form.stock) < 0) {
      erroresTemp.stock = "El stock no puede ser negativo";
    }

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validar()) {
      const atributosCompletos = Object.entries({
        medidas: form.medidas,
        materiales: form.materiales,
        color: form.color,
        estructura: form.estructura,
        caracteristicas: form.caracteristicas,
      }).reduce((acc, [key, value]) => {
        if (value && value.trim() !== "") acc[key] = value;
        return acc;
      }, {});

      const producto = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        imagenUrl: form.imagenUrl,
        precio: Number(form.precio),
        categoria: form.categoria,
        stock: Number(form.stock),
        atributos: atributosCompletos,
      };

      try {
        const response = await postProducto(producto);
        console.log("Producto agregado:", response);

        setExito(`Producto "${form.nombre}" agregado correctamente.`);
        setErrores({});
        setForm({
          nombre: "",
          descripcion: "",
          imagenUrl: "",
          precio: "",
          categoria: "seleccionar",
          stock: "",
          materiales: "",
          medidas: "",
          estructura: "",
          caracteristicas: "",
          color: "",
        });
      } catch (error) {
        console.error("Error al enviar producto:", error);
        setErrores({
          general: "Ocurrió un error al enviar el producto al servidor.",
        });
      }
    }
  };

  useEffect(() => {
    if (exito) {
      const timer = setTimeout(() => setExito(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [exito]);

  return {
    form,
    errores,
    exito,
    handleChange,
    handleSubmit,
  };
}
