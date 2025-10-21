import mongoose from "mongoose";

const productoSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String
    },
    imagenUrl: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    atributos: {
      type: Object, 
      default: {}, 
    },
    categoria: {
      type: String,
    },
    stock:{
      type: Number,
    }
  },
  {
    timestamps: true,
  }
);

const Producto = mongoose.model("Producto", productoSchema);

export default Producto;
