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
import * as categoriaController from "../controllers/categoria.Controller";
import * as marcaController from "../controllers/marcas.Controller";
import * as inventarioController from '../controllers/inventario.controller';

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
router.get("/productos", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productos = await productoController.obtenerProductos();
    res.json(productos);
  } catch (error: any) {
    res.json({ error: error.message})
  }
});

/**
 * @route GET /productos/:id
 * @param {number} :id - ID del producto a buscar.
 * @desc Obtiene un producto por su ID.
 */
router.get("/productos/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  try {
    const producto = await productoController.obtenerProductoPorId(id);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error: any) {
    res.json({ error: error.message})
  }
});

/**
 * @route POST /productos
 * @param {string} nombre - Nombre del producto.
 * @param {string | null} descripcion - Descripción del producto.
 * @param {string} precio - Precio del producto.
 * @param {string} nomenclaturaProveedor - Nomenclatura del proveedor.
 * @param {string} nomenclaturaMarca - Nomenclatura de la marca.
 * @param {string} nomenclaturaCategoria - Nomenclatura de la categoría.
 * @param {string | null} imagen - URL de la imagen del producto.
 * @desc Crea un nuevo producto.
 */
router.post("/productos", async (req: Request, res: Response, next: NextFunction) => {
  const { nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, imagen } = req.body;
  try {
    const producto = await productoController.crearProducto(nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, imagen);
    res.json(producto);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route PUT /productos/:id
 * @param {number} :id - ID del producto a modificar.
 * @param {string} nombre - Nombre del producto.
 * @param {string | null} descripcion - Descripción del producto.
 * @param {string} precio - Precio del producto.
 * @param {string} nomenclaturaProveedor - Nomenclatura del proveedor.
 * @param {string} nomenclaturaMarca - Nomenclatura de la marca.
 * @param {string} nomenclaturaCategoria - Nomenclatura de la categoría.
 * @param {string | null} imagen - URL de la imagen del producto.
 * @desc Modifica un producto por su ID.
 */
router.put("/productos/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const { nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, imagen } = req.body;
  try {
    const producto = await productoController.actualizarProducto(id, nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, imagen);
    res.json(producto);
  } catch (error: any) {
    res.json({ error: error.message})
  }
});

/**
 * @route DELETE /productos/:id
 * @param {number} :id - ID del producto a eliminar.
 * @desc Elimina un producto por su ID.
 */
router.delete("/productos/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  try {
    await productoController.eliminarProducto(id);
    res.status(204).send();
  } catch (error: any) {
    res.json({ error: error.message})
  }
});


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

// Rutas de catalogo de proveedores

/**
 * @route GET /proveedores
 * @desc Obtiene todos los proveedores.
 */
router.get("/proveedores", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const proveedores = await proveedorController.getAllProveedores();
    res.json(proveedores);
  } catch (error: any) {
    res.json({ error: error.message})
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
    res.json({ error: error.message})
  }
});

/**
 * @route POST /proveedores
 * @param {string} nombre - Nombre del proveedor.
 * @param {string} nomenclatura - Nomenclatura del proveedor.
 * @desc Crea un nuevo proveedor.
 */
router.post("/proveedores", async (req: Request, res: Response, next: NextFunction) => {
  const { nombre, nomenclatura, direccion, ciudad, estado, telefono, email } = req.body;
  try {
    const proveedor = await proveedorController.createProveedor(nombre, nomenclatura, direccion, ciudad, estado, telefono, email);
    res.json(proveedor);
  } catch (error: any) {
    res.json({ error: error.message})
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
    res.json({ error: error.message})
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
    res.json({ error: error.message})
  }
});

// Rutas de categorías

/**
 * @route GET /categorias
 * @desc Obtiene todas las categorías.
 */
router.get("/categorias", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categorias = await categoriaController.getAllCategorias();
    res.json(categorias);
  } catch (error: any) {
    res.json({ error: error.message})
  }
});

/**
 * @route GET /categorias/:id
 * @param {number} :id - ID de la categoría a buscar.
 * @desc Obtiene una categoría por su ID.
 */
router.get("/categorias/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  try {
    const categoria = await categoriaController.getCategoriaById(id);
    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json(categoria);
  } catch (error: any) {
    res.json({ error: error.message})
  }
});

/**
 * @route POST /categorias
 * @param {string} nombre - Nombre de la categoría.
 * @param {string} nomenclatura - Nomenclatura de la categoría.
 * @desc Crea una nueva categoría.
 */
router.post("/categorias", async (req: Request, res: Response, next: NextFunction) => {
  const { nombre, nomenclatura } = req.body;
  try {
    const categoria = await categoriaController.createCategoria(nombre, nomenclatura);
    res.json(categoria);
  } catch (error: any) {
    res.json({ error: error.message})
  }
});

/**
 * @route PUT /categorias/:id
 * @param {number} :id - ID de la categoría a modificar.
 * @desc Modifica una categoría por su ID.
 */
router.put("/categorias/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const { nombre, nomenclatura } = req.body;
  try {
    const categoria = await categoriaController.updateCategoria(id, nombre, nomenclatura);
    res.json(categoria);
  } catch (error: any) {
    res.json({ error: error.message})
  }
});

/**
 * @route DELETE /categorias/:id
 * @param {number} :id - ID de la categoría a eliminar.
 * @desc Elimina una categoría por su ID.
 */
router.delete("/categorias/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  try {
    await categoriaController.deleteCategoria(id);
    res.status(204).send();
  } catch (error: any) {
    res.json({ error: error.message})
  }
});

// Rutas de marcas

/**
 * @route GET /marcas
 * @desc Obtiene todas las marcas.
 */
router.get("/marcas", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const marcas = await marcaController.getAllMarcas();
    res.json(marcas);
  } catch (error: any) {
    res.json({ error: error.message})
  }
});

/**
 * @route GET /marcas/:id
 * @param {number} :id - ID de la marca a buscar.
 * @desc Obtiene una marca por su ID.
 */
router.get("/marcas/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  try {
    const marca = await marcaController.getMarcaById(id);
    if (!marca) {
      return res.status(404).json({ error: "Marca no encontrada" });
    }
    res.json(marca);
  } catch (error: any) {
    res.json({ error: error.message})
  }
});

/**
 * @route POST /marcas
 * @param {string} nombre - Nombre de la marca.
 * @param {string} nomenclatura - Nomenclatura de la marca.
 * @desc Crea una nueva marca.
 */
router.post("/marcas", async (req: Request, res: Response, next: NextFunction) => {
  const { nombre, nomenclatura } = req.body;
  try {
    const marca = await marcaController.createMarca(nombre, nomenclatura);
    res.json(marca);
  } catch (error: any) {
    res.json({ error: error.message });
  }
});

/**
 * @route PUT /marcas/:id
 * @param {number} :id - ID de la marca a modificar.
 * @desc Modifica una marca por su ID.
 */
router.put("/marcas/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const { nombre, nomenclatura } = req.body;
  try {
    const marca = await marcaController.updateMarca(id, nombre, nomenclatura);
    res.json(marca);
  } catch (error: any) {
    res.json({ error: error.message})
  }
});

/**
 * @route DELETE /marcas/:id
 * @param {number} :id - ID de la marca a eliminar.
 * @desc Elimina una marca por su ID.
 */
router.delete("/marcas/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  try {
    await marcaController.deleteMarca(id);
    res.status(204).send();
  } catch (error: any) {
    res.json({ error: error.message})
  }
});


// Obtener todos los registros de inventario
router.get('/inventario', async (req, res, next) => {
  try {
      const inventario = await inventarioController.getAllInventario();
      res.json(inventario);
  } catch (error) {
      next(error);
  }
});

// Obtener un registro de inventario por su ID de producto
router.get('/inventario/:id_producto', async (req, res, next) => {
  const id_producto = parseInt(req.params.id_producto, 10);
  try {
      const inventario = await inventarioController.getInventarioByProductId(id_producto);
      if (!inventario) {
          return res.status(404).json({ error: 'Registro de inventario no encontrado' });
      }
      res.json(inventario);
  } catch (error) {
      next(error);
  }
});

// Crear un nuevo registro de inventario
router.post('/inventario', async (req, res, next) => {
  const { id_producto, existencias, StockMinimo, StockMaximo } = req.body;
  try {
      const inventario = await inventarioController.createInventario(id_producto, existencias, StockMinimo, StockMaximo);
      res.status(201).json(inventario);
  } catch (error) {
      next(error);
  }
});

// Actualizar un registro de inventario por su ID de producto
router.put('/inventario/:id_producto', async (req, res, next) => {
  const id_producto = parseInt(req.params.id_producto, 10);
  const { existencias, StockMinimo, StockMaximo } = req.body;
  try {
      const inventario = await inventarioController.updateInventario(id_producto, existencias, StockMinimo, StockMaximo);
      res.json(inventario);
  } catch (error) {
      next(error);
  }
});

// Eliminar un registro de inventario por su ID de producto
router.delete('/inventario/:id_producto', async (req, res, next) => {
  const id_producto = parseInt(req.params.id_producto, 10);
  try {
      await inventarioController.deleteInventario(id_producto);
      res.status(204).send();
  } catch (error) {
      next(error);
  }
});

export default router;
