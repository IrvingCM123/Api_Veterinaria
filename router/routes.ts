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

import { validarVenta } from "../Validators/Venta_Validator";
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

router.get("/", (req, res) => {
  res.send("Bienvenido a la API de la veterinaria");
});

// Rutas de productos
router.get("/productos", productoController.obtenerProductos);
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
router.post("/productos", productoValidator, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  productoController.crearProducto(req, res);
});
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

// Rutas de usuarios
router.post("/usuarios/login", InicioSesion, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  usuarioController.iniciarSesion(req, res);
});
router.get("/usuarios", usuarioController.obtenerUsuarios);
router.get("/usuarios/:email", usuarioController.obtenerUsuario);

router.use(errorHandler);

export default router;
