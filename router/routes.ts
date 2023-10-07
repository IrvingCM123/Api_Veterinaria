import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  Router,
} from "express";

import { check, validationResult } from "express-validator";

import * as productoController from "../controllers/productosControllers";
import * as historialController from "../controllers/historialVentasControllers";
import * as usuarioController from "../controllers/usuarioControllers";

import {
  validarVenta,
  obtenerInfoDocumentoValidator,
} from "../Validators/Venta_Validator";

import {
  validarUsuario,
  InicioSesion,
  usuarioValidator,
} from "../Validators/Usuario_Validator";

import {
  productoValidator,
  EliminarProducto,
  ModificarProducto,
  BuscarProductoValidador,
} from "../Validators/Producto_Validator";

import { errorHandler } from "../middleware/errorHandler";

const router = Router();

// Ruta principal de bienvenida
router.get("/", (req, res) => {
  res.send("Bienvenido a la API de la veterinaria");
});

// Rutas de productos

/**
 * @route GET /productos
 * @desc Obtiene todos los productos.
 */
router.get("/productos", productoController.obtenerProductos);

/**
 * @route GET /productosid/:id
 * @param {string} :id - ID del producto a buscar.
 * @desc Busca un producto por su ID.
 */
router.get(
  "/productosid/:id",
  BuscarProductoValidador,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    productoController.buscarProducto(req, res);
  }
);

/**
 * @route POST /productos
 * @param {string} nombre - Nombre del producto.
 * @param {number} precio - Precio del producto.
 * @desc Crea un nuevo producto.
 */
router.post("/productos", productoValidator, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  productoController.crearProducto(req, res);
});

/**
 * @route PUT /productos/:id
 * @param {string} :id - ID del producto a modificar.
 * @desc Modifica un producto por su ID.
 */
router.put(
  "/productos/:id",
  ModificarProducto,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    productoController.modificarProducto(req, res);
  }
);

/**
 * @route DELETE /productos/:id
 * @param {string} :id - ID del producto a eliminar.
 * @desc Elimina un producto por su ID.
 */
router.delete(
  "/productos/:id",
  EliminarProducto,
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    productoController.eliminarProducto(req, res);
  }
);

// Rutas de ventas

/**
 * @route POST /ventas
 * @param {string} nombre - Nombre del producto.
 * @param {number} precio - Precio del producto.
 * @desc Registra una venta.
 */
router.post(
  "/ventas",
  validarVenta,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    historialController.registrarVenta(req, res, next);
  }
);

/**
 * @route GET /ventas
 * @desc Obtiene todas las ventas registradas.
 */
router.get("/ventas", historialController.obtenerNombresDocumentos);

/**
 * @route GET /ventasid/:id
 * @param {string} nombreDocumento - Nombre del documento.
 * @desc obten la información de cada venta por ID.
 */
router.get(
  "/ventasid/:id",

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    historialController.obtenerInfoDocumento(req, res, next);
  }
);

/**
 * @route GET /ventasmes/:id
 * @param {string} nombreDocumento - Nombre del documento.
 * @desc obten la información del historial de venta al mes.
 */
router.get(
  "/ventasmes/:id",

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    historialController.obtenerInfoMes(req, res, next);
  }
);

// Rutas de usuarios

/**
 * @route POST /usuarios/login
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @desc Inicia sesión de un usuario.
 */
router.post("/usuarios/login", InicioSesion, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  usuarioController.iniciarSesion(req, res);
});

/**
 * @route GET /usuarios
 * @desc Obtiene todos los usuarios.
 */
router.get("/usuarios", usuarioController.obtenerUsuarios);

/**
 * @route GET /usuarios/:email
 * @param {string} :email - Correo electrónico del usuario a buscar.
 * @desc Obtiene un usuario por su correo electrónico.
 */
router.get("/usuarios/:email", usuarioController.obtenerUsuario);

export default router;
