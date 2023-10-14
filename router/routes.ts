import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  Router,
} from "express";

import { check, validationResult } from "express-validator";

import * as productoController from "../controllers/productosControllers";
import * as userController from '../controllers/usuarioControllers';
import * as proveedorController from "../controllers/provedores.Controller";
import * as categoriaController from "../controllers/categoria.Controller";
import * as marcaController from "../controllers/marcas.Controller";
import * as inventarioController from '../controllers/inventario.controller';
import * as sucursalController from '../controllers/sucursal.Controller';
import * as catalogoVendedorController from '../controllers/vendedor.Controller';
import * as ventaController from "../controllers/venta.Controller";
import * as detalleVentaController from "../controllers/detalleVenta.Controller"
import * as animalController from "../controllers/animal.Controller";
import * as tipoProductoController from "../controllers/tipoProducto.Controller";
import * as inventariogranelController from "../controllers/inventario_granel.Controller";

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
    res.json({ error: error.message })
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
    res.json({ error: error.message })
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
  const { nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, imagen, cantidad, animal, tipocantidad, precio_granel, venta_granel} = req.body;
  try {
    const producto = await productoController.crearProducto(nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, imagen, cantidad, animal, tipocantidad, precio_granel, venta_granel);
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
  const { nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, imagen, cantidad, animal, tipocantidad } = req.body;
  try {
    const producto = await productoController.actualizarProducto(id, nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, imagen, cantidad, animal, tipocantidad);
    res.json(producto);
  } catch (error: any) {
    res.json({ error: error.message })
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
    res.json({ error: error.message })
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
  userController.iniciarSesion(req, res);
});

/**
 * @route GET /usuarios
 * @desc Obtiene todos los usuarios.
 */
router.get("/usuarios", userController.obtenerUsuarios);

/**
 * @route GET /usuarios/:email
 * @param {string} :email - Correo electrónico del usuario a buscar.
 * @desc Obtiene un usuario por su correo electrónico.
 */
router.get("/usuarios/:email", userController.obtenerUsuario);

router.post('/usuarios', async (req: Request, res: Response) => {
  const { email, password, nombre, apellido, telefono, direccion, imagen } = req.body;
  try {
    const usuario = await userController.createUsuario(email, password, nombre, apellido, telefono, direccion, imagen);
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear usuario' });
  }
});

// Ruta para actualizar un usuario por su ID
router.put('/usuarios/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const { email, password, nombre, apellido, telefono, direccion, imagen } = req.body;
  try {
    const usuario = await userController.updateUsuario(id, email, password, nombre, apellido, telefono, direccion, imagen);
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar usuario' });
  }
});

// Ruta para eliminar un usuario por su ID
router.delete('/usuarios/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    await userController.deleteUsuario(id);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});


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
    res.json({ error: error.message })
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
    res.json({ error: error.message })
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
    res.json({ error: error.message })
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
    res.json({ error: error.message })
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
    res.json({ error: error.message })
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
    res.json({ error: error.message })
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
    res.json({ error: error.message })
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
    res.json({ error: error.message })
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
    res.json({ error: error.message })
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
    res.json({ error: error.message })
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
    res.json({ error: error.message })
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
    res.json({ error: error.message })
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
    res.json({ error: error.message })
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
    res.json({ error: error.message })
  }
});


// Obtener todos los registros de inventario
router.get('/inventario', async (req, res, next) => {
  try {
    const inventario = await inventarioController.getAllInventario();
    res.json(inventario);
  } catch (error: any) {
    res.json({ error: error.message })
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
  } catch (error: any) {
    res.json({ error: error.message })
  }
});

// Crear un nuevo registro de inventario
router.post('/inventario', async (req, res, next) => {
  const { id_producto, existencias, StockMinimo, StockMaximo } = req.body;
  try {
    const inventario = await inventarioController.createInventario(id_producto, existencias, StockMinimo, StockMaximo);
    res.status(201).json(inventario);
  } catch (error: any) {
    res.json({ error: error.message })
  }
});

// Actualizar un registro de inventario por su ID de producto
router.put('/inventario/:id_producto', async (req, res, next) => {
  const id_producto = parseInt(req.params.id_producto, 10);
  const { existencias, StockMinimo, StockMaximo } = req.body;
  try {
    const inventario = await inventarioController.updateInventario(id_producto, existencias, StockMinimo, StockMaximo);
    res.json(inventario);
  } catch (error: any) {
    res.json({ error: error.message })
  }
});

// Eliminar un registro de inventario por su ID de producto
router.delete('/inventario/:id_producto', async (req, res, next) => {
  const id_producto = parseInt(req.params.id_producto, 10);
  try {
    await inventarioController.deleteInventario(id_producto);
    res.status(204).send();
  } catch (error: any) {
    res.json({ error: error.message })
  }
});

// Rutas de sucursales

/**
 * @route GET /sucursales
 * @desc Obtiene todas las sucursales.
 */
router.get('/sucursales', async (req, res, next) => {
  try {
    const sucursales = await sucursalController.getAllSucursales();
    res.json(sucursales);
  } catch (error: any) {
    // Manejo de erroeres
    res.json({ error: error.message })
  }
});

/**
 * @route GET /sucursales/:id
 * @param {number} :id - ID de la sucursal a buscar.
 * @desc Obtiene una sucursal por su ID.
 */
router.get('/sucursales/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    const sucursal = await sucursalController.getSucursalById(id);
    if (!sucursal) {
      return res.status(404).json({ error: 'Sucursal no encontrada' });
    }
    res.json(sucursal);
  } catch (error: any) {
    // Manejo de erro: anyres
    res.json({ error: error.message })
  }
});

/**
 * @route POST /sucursales
 * @param {string} nombre - Nombre de la sucursal.
 * @param {string} direccion - Dirección de la sucursal.
 * @param {string} ciudad - Ciudad de la sucursal.
 * @param {string} estado - Estado de la sucursal.
 * @param {string} codigoPostal - Código postal de la sucursal.
 * @param {string} telefono - Teléfono de la sucursal.
 * @param {string} encargado - Encargado de la sucursal.
 * @desc Crea una nueva sucursal.
 */
router.post('/sucursales', async (req, res, next) => {
  const { nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado } = req.body;
  try {
    const sucursal = await sucursalController.createSucursal(
      nombre,
      direccion,
      ciudad,
      estado,
      codigoPostal,
      telefono,
      encargado
    );
    res.json(sucursal);
  } catch (error: any) {
    // Manejo de errores
    res.json({ error: error.message })
  }
});

/**
 * @route PUT /sucursales/:id
 * @param {number} :id - ID de la sucursal a modificar.
 * @desc Modifica una sucursal por su ID.
 */
router.put('/sucursales/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado } = req.body;
  try {
    const sucursal = await sucursalController.updateSucursal(
      id,
      nombre,
      direccion,
      ciudad,
      estado,
      codigoPostal,
      telefono,
      encargado
    );
    res.json(sucursal);
  } catch (error: any) {
    // Manejo de errores
    res.json({ error: error.message })
  }
});

/**
 * @route DELETE /sucursales/:id
 * @param {number} :id - ID de la sucursal a eliminar.
 * @desc Elimina una sucursal por su ID.
 */
router.delete('/sucursales/:id', async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  try {
    await sucursalController.deleteSucursal(id);
    res.status(204).send();
  } catch (error: any) {
    // Manejo de errores
    res.json({ error: error.message })
  }
});


// Ruta para obtener todos los vendedores
router.get('/vendedores', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vendedores = await catalogoVendedorController.getAllVendedores();
    res.json(vendedores);
  } catch (error: any) {
    // Manejar errores aquí
    next(error);
  }
});

// Ruta para obtener un vendedor por su ID
router.get('/vendedores/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  try {
    const vendedor = await catalogoVendedorController.getVendedorById(id);
    if (!vendedor) {
      return res.status(404).json({ error: 'Vendedor no encontrado' });
    }
    res.json(vendedor);
  } catch (error: any) {
    // Manejar errores aquí
    next(error);
  }
});

// Ruta para crear un nuevo vendedor
router.post('/vendedores', async (req: Request, res: Response, next: NextFunction) => {
  const { acronimo, permisoVenta, userId } = req.body;
  try {
    const vendedor = await catalogoVendedorController.createVendedor(acronimo, permisoVenta, userId);
    res.json(vendedor);
  } catch (error: any) {
    // Manejar errores aquí
    next(error);
  }
});

// Ruta para actualizar un vendedor por su ID
router.put('/vendedores/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const { acronimo, permisoVenta, userId } = req.body;
  try {
    const vendedor = await catalogoVendedorController.updateVendedor(id, acronimo, permisoVenta, userId);
    res.json(vendedor);
  } catch (error: any) {
    // Manejar errores aquí
    next(error);
  }
});

// Ruta para eliminar un vendedor por su ID
router.delete('/vendedores/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  try {
    await catalogoVendedorController.deleteVendedor(id);
    res.status(204).send();
  } catch (error: any) {
    // Manejar errores aquí
    next(error);
  }
});

// Rutas de ventas

/**
 * @route GET /ventas
 * @desc Obtiene todas las ventas.
 */
router.get("/ventas", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ventas = await ventaController.getAllVentas();
    res.json(ventas);
  } catch (error: any) {
    res.json({ error: error.message })
  }
});

/**
 * @route GET /ventas/:id
 * @param {number} :id - ID de la venta a buscar.
 * @desc Obtiene una venta por su ID.
 */
router.get("/ventas/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  try {
    const venta = await ventaController.getVentaById(id);
    if (!venta) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }
    res.json(venta);
  } catch (error: any) {
    res.json({ error: error.message })
  }
});

/**
 * @route POST /ventas
 * @desc Crea una nueva venta.
 */
router.post("/ventas", async (req: Request, res: Response, next: NextFunction) => {
  const { id_vendedor, id_sucursal, fecha_venta, total_venta, subtotal, iva, detallesVenta } = req.body;
  try {
    const venta = await ventaController.crearVenta(id_vendedor, id_sucursal, fecha_venta, total_venta, subtotal, iva, detallesVenta);
    res.json(venta);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route PUT /ventas/:id
 * @param {number} :id - ID de la venta a modificar.
 * @desc Actualiza una venta por su ID.
 */
router.put("/ventas/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const { id_sucursal, id_vendedor, fecha_venta, total_venta, subtotal, iva } = req.body;
  try {
    const venta = await ventaController.updateVenta(id, id_sucursal, id_vendedor, fecha_venta, total_venta, subtotal, iva);
    res.json(venta);
  } catch (error: any) {
    res.json({ error: error.message })
  }
});

/**
 * @route DELETE /ventas/:id
 * @param {number} :id - ID de la venta a eliminar.
 * @desc Elimina una venta por su ID.
 */
router.delete("/ventas/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  try {
    await ventaController.deleteVenta(id);
    res.status(204).send();
  } catch (error: any) {
    res.json({ error: error.message })
  }
});

// Rutas de detalles de venta

/**
 * @route GET /detalles-venta
 * @desc Obtiene todos los detalles de venta.
 */
router.get("/detalles-venta", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const detallesVenta = await detalleVentaController.getAllDetallesVenta();
    res.json(detallesVenta);
  } catch (error: any) {
    res.json({ error: error.message });
  }
});

/**
 * @route GET /detalles-venta/:id
 * @param {number} :id - ID del detalle de venta a buscar.
 * @desc Obtiene un detalle de venta por su ID.
 */
router.get("/detalles-venta/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  try {
    const detalleVenta = await detalleVentaController.getDetalleVentaById(id);
    if (!detalleVenta) {
      return res.status(404).json({ error: "Detalle de venta no encontrado" });
    }
    res.json(detalleVenta);
  } catch (error: any) {
    res.json({ error: error.message });
  }
});

/**
 * @route POST /detalles-venta
 * @desc Crea un nuevo detalle de venta.
 */
router.post("/detalles-venta", async (req: Request, res: Response, next: NextFunction) => {
  const { id_venta, id_producto, cantidad_vendida, precio_producto, subtotal, venta_granel } = req.body;
  try {
    const detalleVenta = await detalleVentaController.createDetalleVenta(
      id_venta,
      id_producto,
      cantidad_vendida,
      precio_producto,
      subtotal,
      venta_granel
    );
    res.json(detalleVenta);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route PUT /detalles-venta/:id
 * @param {number} :id - ID del detalle de venta a modificar.
 * @desc Actualiza un detalle de venta por su ID.
 */
router.put("/detalles-venta/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  const { id_venta, id_producto, cantidad_vendida, precio_producto, subtotal } = req.body;
  try {
    const detalleVenta = await detalleVentaController.updateDetalleVenta(
      id,
      id_venta,
      id_producto,
      cantidad_vendida,
      precio_producto,
      subtotal
    );
    res.json(detalleVenta);
  } catch (error: any) {
    res.json({ error: error.message });
  }
});

/**
 * @route DELETE /detalles-venta/:id
 * @param {number} :id - ID del detalle de venta a eliminar.
 * @desc Elimina un detalle de venta por su ID.
 */
router.delete("/detalles-venta/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10);
  try {
    await detalleVentaController.deleteDetalleVenta(id);
    res.status(204).send();
  } catch (error: any) {
    res.json({ error: error.message });
  }
});

// Rutas de animales

/**
 * @route GET /animales
 * @desc Obtiene todos los animales.
 */
router.get("/animales", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const animales = await animalController.getAllAnimales();
    res.json(animales);
  } catch (error: any) {
    res.json({ error: error.message });
  }
}
);

/**
 * @route GET /animales/:id
 * @param {number} :id - ID del animal a buscar.
 * @desc Obtiene un animal por su ID.
 */
router.get("/animales/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10)
  try {
    const animal = await animalController.getAnimalById(id);
    if (!animal) {
      return res.status(404).json({ error: "Animal no encontrado" });
    }
    res.json(animal);
  } catch (error: any) {
    res.json({ error: error.message });
  }
}
);

/**
 * @route POST /animales
 * @desc Crea un nuevo animal.
 */
router.post("/animales", async (req: Request, res: Response, next: NextFunction) => {
  const { nombre, nomenclatura } = req.body;
  try {
    const animal = await animalController.createAnimal(nombre, nomenclatura);
    res.json(animal);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
);

/**
 * @route PUT /animales/:id
 * @param {number} :id - ID del animal a modificar.
 * @desc Actualiza un animal por su ID.
 */
router.put("/animales/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10)
  const { nombre, nomenclatura } = req.body;
  try {
    const animal = await animalController.updateAnimal(id, nombre, nomenclatura);
    res.json(animal);
  } catch (error: any) {
    res.json({ error: error.message });
  }
}
);

/**
 * @route DELETE /animales/:id
 * @param {number} :id - ID del animal a eliminar.
 * @desc Elimina un animal por su ID.
 */
router.delete("/animales/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10)
  try {
    await animalController.deleteAnimal(id);
    res.status(204).send();
  } catch (error: any) {
    res.json({ error: error.message });
  }
}
);

// Rutas de tipos de cantidad

/**
 * @route GET /tipos-cantidad
 * @desc Obtiene todos los tipos de cantidad.
 */
router.get("/tipos-cantidad", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tiposCantidad = await tipoProductoController.getAllTipoCantidad();
    res.json(tiposCantidad);
  } catch (error: any) {
    res.json({ error: error.message });
  }
}
);

/**
 * @route GET /tipos-cantidad/:id
 * @param {number} :id - ID del tipo de cantidad a buscar.
 * @desc Obtiene un tipo de cantidad por su ID.
 */
router.get("/tipos-cantidad/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10)
  try {
    const tipoCantidad = await tipoProductoController.getTipoCantidadById(id);
    if (!tipoCantidad) {
      return res.status(404).json({ error: "Tipo de cantidad no encontrado" });
    }
    res.json(tipoCantidad);
  } catch (error: any) {
    res.json({ error: error.message });
  }
}
);

/**
 * @route POST /tipos-cantidad
 * @desc Crea un nuevo tipo de cantidad.
 */
router.post("/tipos-cantidad", async (req: Request, res: Response, next: NextFunction) => {
  const { nombre, nomenclatura } = req.body;
  try {
    const tipoCantidad = await tipoProductoController.createTipoCantidad(nombre, nomenclatura);
    res.json(tipoCantidad);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
);

/**
 * @route PUT /tipos-cantidad/:id
 * @param {number} :id - ID del tipo de cantidad a modificar.
 * @desc Actualiza un tipo de cantidad por su ID.
 */

router.put("/tipos-cantidad/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10)
  const { nombre, nomenclatura } = req.body;
  try {
    const tipoCantidad = await tipoProductoController.updateTipoCantidad(id, nombre, nomenclatura);
    res.json(tipoCantidad);
  } catch (error: any) {
    res.json({ error: error.message });
  }
}
);

// Rutas para inventario_granel

/**
 * @route GET /inventario-granel
 * @desc Obtiene todos los registros de inventario granel.
 */

router.get("/inventario-granel", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const inventarioGranel = await inventariogranelController.getAllInventarioGranel();
    res.json(inventarioGranel);
  } catch (error: any) {
    res.json({ error: error.message });
  }
}
);

/**
 * @route GET /inventario-granel/:id
 * @param {number} :id - ID del registro de inventario granel a buscar.
 * @desc Obtiene un registro de inventario granel por su ID.
 */

router.get("/inventario-granel/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10)
  try {
    const inventarioGranel = await inventariogranelController.getInventarioGranelById(id);
    if (!inventarioGranel) {
      return res.status(404).json({ error: "Registro de inventario granel no encontrado" });
    }
    res.json(inventarioGranel);
  } catch (error: any) {
    res.json({ error: error.message });
  }
}
);

/**
 * @route POST /inventario-granel
 * @desc Crea un nuevo registro de inventario granel.
 */

router.post("/inventario-granel", async (req: Request, res: Response, next: NextFunction) => {
  const { id_producto, existencias, StockMinimo, StockMaximo } = req.body;
  try {
    const inventarioGranel = await inventariogranelController.createInventarioGranel(id_producto);
    res.json(inventarioGranel);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
);

/**
 * @route PUT /inventario-granel/:id
 * @param {number} :id - ID del registro de inventario granel a modificar.
 * @desc Actualiza un registro de inventario granel por su ID.
 */

router.put("/inventario-granel/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id, 10)
  const { existencias, StockMinimo, StockMaximo } = req.body;
  try {
    const inventarioGranel = await inventariogranelController.updateInventarioGranel(id, existencias);
    res.json(inventarioGranel);
  } catch (error: any) {
    res.json({ error: error.message });
  }
}
);

export default router;