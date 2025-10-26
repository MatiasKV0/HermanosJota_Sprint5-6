import Producto from "../models/Producto.js";
import mongoose from "mongoose";

const getAllProducts = async (req, res) => {
  const productos = await Producto.find();
  res.json({
    total: productos.length,
    productos,
  });
};

const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (Number.isNaN(id)) {
      const error = new Error("ID inválido");
      error.status = 400;
      return next(error);
    }

    const product = await Producto.findById(id);
    console.log(product);

    if (!product) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      return next(error);
    }

    console.log("Producto solicitado:", id);
    res.json({ product });
  } catch (error) {
    next(error);
  }
};

const postProduct = async (req, res, next) => {
  const producto = new Producto(req.body);
  try {
    const productoGuardado = await producto.save();
    res.json(productoGuardado);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const putProduct = async (req, res, next) => {};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Id inválido");
      error.status = 400;
      return next(error);
    }

    const productoEliminado = await Producto.findByIdAndDelete(id);

    if (!productoEliminado) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      return next(error);
    }

    return res.status(204).send();

  } catch (error) {
    next(error);
  }
};


export { getAllProducts, getProduct, postProduct, putProduct, deleteProduct };
