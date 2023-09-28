import { buscarProducto } from './../controllers/productosControllers';
import { Request, Response, NextFunction, RequestHandler , Router } from 'express';
import { check, validationResult } from 'express-validator';

import * as productoController from '../controllers/productosControllers';
import * as historialController from '../controllers/historialVentasControllers'

import { validarVenta } from '../Validators/Venta_Validator';
import { validarUsuario, InicioSesion, usuarioValidator } from '../Validators/Usuario_Validator';
import {
  productoValidator,
  EliminarProducto,
  ModificarProducto,
  BuscarProductoValidador,
} from '../Validators/Producto_Validator';

import { errorHandler } from '../middleware/errorHandler';

const router = Router();

router.get('/', (req, res) => { 
  res.send('Bienvenido a la API de la veterinaria');

});

/**
 * Ruta para obtener todos los productos.
 * @route GET /productos
 */
router.get('/productos',  productoController.obtenerProductos);

/**
 * Ruta para buscar un producto por su ID.
 * @route GET /productos/:id
 * @param {string} :id - ID del producto a buscar.
 */
router.get('/productosid/:id', BuscarProductoValidador, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  productoController.buscarProducto(req, res);
});

/**
 * Ruta para registrar una venta.
 * @route POST /ventas
 * @param {string} nombre - Nombre del producto.
 * @param {number} precio - Precio del producto.
 */

router.post(
  '/ventas',
  validarVenta, 
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    historialController.registrarVenta(req, res, next);
  }
);

router.use(errorHandler);

export default router;
