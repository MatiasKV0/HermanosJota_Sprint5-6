import Producto from "../models/Producto.js";

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

const putProduct = async (req, res, next) => {
  try {
    const productoId = req.params.id;
    const datosActualizados = req.body;
    console.log(`Actualizando producto con ID ${productoId} con datos:`, datosActualizados);

    const productoActualizado = await Producto.findByIdAndUpdate(
      productoId,
      datosActualizados, 
      { new: true, runValidators: true }
    );

    if (!productoActualizado) {
      const error = new Error('Producto no encontrado para actualizar');
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      mensaje: 'Producto actualizado con éxito',
      producto: productoActualizado
    });

  } catch (error) {
    console.error('Error al actualizar producto:', error.message);
    error.status = 400;
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {};

export { getAllProducts, getProduct, postProduct, putProduct, deleteProduct };
