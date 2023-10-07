import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  Router,
} from "express";

import { check, validationResult } from "express-validator";

import * as productoController from "../controllers/productosControllers";
import * as usuarioController from "../controllers/usuarioControllers";
import * as proveedorController from "../controllers/provedores.Controller";

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

// Rutas de proveedores

/**
 * @route GET /proveedores
 * @desc Obtiene todos los proveedores.
 */
router.get("/proveedores", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const proveedores = await proveedorController.getAllProveedores();
    res.json(proveedores);
  } catch (error: any) {
    errorHandler(error, req, res, next);
  }
});

/**
 * @route GET /proveedores/:id
 * @param {number} :id - ID del proveedor a buscar.
 * @desc Obtiene un proveedor por su ID.
 */
router.get("/proveedores/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  try {
    const proveedor = await proveedorController.getProveedorById(id);
    if (!proveedor) {
      return res.status(404).json({ error: "Proveedor no encontrado" });
    }
    res.json(proveedor);
  } catch (error: any) {
    errorHandler(error, req, res, next);
  }
});

/**
 * @route POST /proveedores
 * @param {string} nombre - Nombre del proveedor.
 * @param {string} nomenclatura - Nomenclatura del proveedor.
 * @desc Crea un nuevo proveedor.
 */
router.post("/proveedores", async (req: Request, res: Response, next: NextFunction) => {
  const { nombre, nomenclatura } = req.body;
  try {
    const proveedor = await proveedorController.createProveedor(nombre, nomenclatura);
    res.json(proveedor);
  } catch (error: any) {
    errorHandler(error, req, res, next);
  }
});

/**
 * @route PUT /proveedores/:id
 * @param {number} :id - ID del proveedor a modificar.
 * @desc Modifica un proveedor por su ID.
 */
router.put("/proveedores/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const { nombre, nomenclatura } = req.body;
  try {
    const proveedor = await proveedorController.updateProveedor(id, nombre, nomenclatura);
    res.json(proveedor);
  } catch (error: any) {
    errorHandler(error, req, res, next);
  }
});

/**
 * @route DELETE /proveedores/:id
 * @param {number} :id - ID del proveedor a eliminar.
 * @desc Elimina un proveedor por su ID.
 */
router.delete("/proveedores/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  try {
    await proveedorController.deleteProveedor(id);
    res.status(204).send();
  } catch (error: any) {
    errorHandler(error, req, res, next);
  }
});


export default router;
