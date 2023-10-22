"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const productoController = __importStar(require("../controllers/productosControllers"));
const userController = __importStar(require("../controllers/usuarioControllers"));
const proveedorController = __importStar(require("../controllers/provedores.Controller"));
const categoriaController = __importStar(require("../controllers/categoria.Controller"));
const marcaController = __importStar(require("../controllers/marcas.Controller"));
const inventarioController = __importStar(require("../controllers/inventario.controller"));
const sucursalController = __importStar(require("../controllers/sucursal.Controller"));
const catalogoVendedorController = __importStar(require("../controllers/vendedor.Controller"));
const ventaController = __importStar(require("../controllers/venta.Controller"));
const detalleVentaController = __importStar(require("../controllers/detalleVenta.Controller"));
const animalController = __importStar(require("../controllers/animal.Controller"));
const tipoProductoController = __importStar(require("../controllers/tipoProducto.Controller"));
const inventariogranelController = __importStar(require("../controllers/inventario_granel.Controller"));
const Usuario_Validator_1 = require("../Validators/Usuario_Validator");
const router = (0, express_1.Router)();
// Ruta principal de bienvenida
router.get("/", (req, res) => {
    res.send("Bienvenido a la API de la veterinaria");
});
// Rutas de productos
/**
 * @route GET /productos
 * @desc Obtiene todos los productos.
 */
router.get("/productos", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield productoController.obtenerProductos();
        res.json(productos);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route GET /productos/:id
 * @param {number} :id - ID del producto a buscar.
 * @desc Obtiene un producto por su ID.
 */
router.get("/productos/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const producto = yield productoController.obtenerProductoPorId(id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(producto);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
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
router.post("/productos", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, url_imagen, cantidad, nomenclaturaAnimal, tipocantidad, precio_granel, venta_granel, codigo } = req.body;
    try {
        const producto = yield productoController.crearProducto(nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, url_imagen, cantidad, nomenclaturaAnimal, tipocantidad, precio_granel, venta_granel, codigo);
        res.json(producto);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
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
router.put("/productos/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const id = parseInt(req.params.id, 10);
    const { nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, url_imagen, cantidad, animal, tipocantidad, precio_granel, venta_granel } = req.body;
    try {
        const producto = yield productoController.actualizarProducto(id, nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, url_imagen, cantidad, animal, tipocantidad, precio_granel, venta_granel);
        res.json(producto);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route DELETE /productos/:id
 * @param {number} :id - ID del producto a eliminar.
 * @desc Elimina un producto por su ID.
 */
router.delete("/productos/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    const id = parseInt(req.params.id, 10);
    try {
        yield productoController.eliminarProducto(id);
        res.status(204).send();
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
// Rutas de usuarios
/**
 * @route POST /usuarios/login
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @desc Inicia sesión de un usuario.
 */
router.post("/usuarios/login", Usuario_Validator_1.InicioSesion, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
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
router.post('/usuarios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, nombre, apellido, telefono, direccion, imagen } = req.body;
    try {
        const usuario = yield userController.createUsuario(email, password, nombre, apellido, telefono, direccion, imagen);
        res.json(usuario);
    }
    catch (error) {
        res.status(400).json({ error: 'Error al crear usuario' });
    }
}));
// Ruta para actualizar un usuario por su ID
router.put('/usuarios/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { email, password, nombre, apellido, telefono, direccion, imagen } = req.body;
    try {
        const usuario = yield userController.updateUsuario(id, email, password, nombre, apellido, telefono, direccion, imagen);
        res.json(usuario);
    }
    catch (error) {
        res.status(400).json({ error: 'Error al actualizar usuario' });
    }
}));
// Ruta para eliminar un usuario por su ID
router.delete('/usuarios/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        yield userController.deleteUsuario(id);
        res.json({ message: 'Usuario eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
}));
// Rutas de catalogo de proveedores
/**
 * @route GET /proveedores
 * @desc Obtiene todos los proveedores.
 */
router.get("/proveedores", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedores = yield proveedorController.getAllProveedores();
        res.json(proveedores);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route GET /proveedores/:id
 * @param {number} :id - ID del proveedor a buscar.
 * @desc Obtiene un proveedor por su ID.
 */
router.get("/proveedores/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const proveedor = yield proveedorController.getProveedorById(id);
        if (!proveedor) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }
        res.json(proveedor);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route POST /proveedores
 * @param {string} nombre - Nombre del proveedor.
 * @param {string} nomenclatura - Nomenclatura del proveedor.
 * @desc Crea un nuevo proveedor.
 */
router.post("/proveedores", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, nomenclatura, direccion, ciudad, estado, telefono, email } = req.body;
    try {
        const proveedor = yield proveedorController.createProveedor(nombre, nomenclatura, direccion, ciudad, estado, telefono, email);
        res.json(proveedor);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route PUT /proveedores/:id
 * @param {number} :id - ID del proveedor a modificar.
 * @desc Modifica un proveedor por su ID.
 */
router.put("/proveedores/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { nombre, nomenclatura } = req.body;
    try {
        const proveedor = yield proveedorController.updateProveedor(id, nombre, nomenclatura);
        res.json(proveedor);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route DELETE /proveedores/:id
 * @param {number} :id - ID del proveedor a eliminar.
 * @desc Elimina un proveedor por su ID.
 */
router.delete("/proveedores/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        yield proveedorController.deleteProveedor(id);
        res.status(204).send();
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
// Rutas de categorías
/**
 * @route GET /categorias
 * @desc Obtiene todas las categorías.
 */
router.get("/categorias", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorias = yield categoriaController.getAllCategorias();
        res.json(categorias);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route GET /categorias/:id
 * @param {number} :id - ID de la categoría a buscar.
 * @desc Obtiene una categoría por su ID.
 */
router.get("/categorias/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const categoria = yield categoriaController.getCategoriaById(id);
        if (!categoria) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }
        res.json(categoria);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route POST /categorias
 * @param {string} nombre - Nombre de la categoría.
 * @param {string} nomenclatura - Nomenclatura de la categoría.
 * @desc Crea una nueva categoría.
 */
router.post("/categorias", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, nomenclatura } = req.body;
    try {
        const categoria = yield categoriaController.createCategoria(nombre, nomenclatura);
        res.json(categoria);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route PUT /categorias/:id
 * @param {number} :id - ID de la categoría a modificar.
 * @desc Modifica una categoría por su ID.
 */
router.put("/categorias/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { nombre, nomenclatura } = req.body;
    try {
        const categoria = yield categoriaController.updateCategoria(id, nombre, nomenclatura);
        res.json(categoria);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route DELETE /categorias/:id
 * @param {number} :id - ID de la categoría a eliminar.
 * @desc Elimina una categoría por su ID.
 */
router.delete("/categorias/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        yield categoriaController.deleteCategoria(id);
        res.status(204).send();
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
// Rutas de marcas
/**
 * @route GET /marcas
 * @desc Obtiene todas las marcas.
 */
router.get("/marcas", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const marcas = yield marcaController.getAllMarcas();
        res.json(marcas);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route GET /marcas/:id
 * @param {number} :id - ID de la marca a buscar.
 * @desc Obtiene una marca por su ID.
 */
router.get("/marcas/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const marca = yield marcaController.getMarcaById(id);
        if (!marca) {
            return res.status(404).json({ error: "Marca no encontrada" });
        }
        res.json(marca);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route POST /marcas
 * @param {string} nombre - Nombre de la marca.
 * @param {string} nomenclatura - Nomenclatura de la marca.
 * @desc Crea una nueva marca.
 */
router.post("/marcas", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, nomenclatura } = req.body;
    try {
        const marca = yield marcaController.createMarca(nombre, nomenclatura);
        res.json(marca);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route PUT /marcas/:id
 * @param {number} :id - ID de la marca a modificar.
 * @desc Modifica una marca por su ID.
 */
router.put("/marcas/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { nombre, nomenclatura } = req.body;
    try {
        const marca = yield marcaController.updateMarca(id, nombre, nomenclatura);
        res.json(marca);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route DELETE /marcas/:id
 * @param {number} :id - ID de la marca a eliminar.
 * @desc Elimina una marca por su ID.
 */
router.delete("/marcas/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        yield marcaController.deleteMarca(id);
        res.status(204).send();
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
// Obtener todos los registros de inventario
router.get('/inventario', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventario = yield inventarioController.getAllInventario();
        res.json(inventario);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
// Obtener un registro de inventario por su ID de producto
router.get('/inventario/:id_producto', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id_producto = parseInt(req.params.id_producto, 10);
    try {
        const inventario = yield inventarioController.getInventarioByProductId(id_producto);
        if (!inventario) {
            return res.status(404).json({ error: 'Registro de inventario no encontrado' });
        }
        res.json(inventario);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
// Crear un nuevo registro de inventario
router.post('/inventario', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto, existencias, stock_minimo, stock_maximo } = req.body;
    try {
        const inventario = yield inventarioController.createInventario(id_producto, existencias, stock_minimo, stock_maximo);
        res.status(201).json(inventario);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
// Actualizar un registro de inventario por su ID de producto
router.put('/inventario/:id_producto', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id_producto = parseInt(req.params.id_producto, 10);
    const { existencias, StockMinimo, StockMaximo } = req.body;
    try {
        const inventario = yield inventarioController.updateInventario(id_producto, existencias, StockMinimo, StockMaximo);
        res.json(inventario);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
// Eliminar un registro de inventario por su ID de producto
router.delete('/inventario/:id_producto', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id_producto = parseInt(req.params.id_producto, 10);
    try {
        yield inventarioController.deleteInventario(id_producto);
        res.status(204).send();
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
// Rutas de sucursales
/**
 * @route GET /sucursales
 * @desc Obtiene todas las sucursales.
 */
router.get('/sucursales', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sucursales = yield sucursalController.getAllSucursales();
        res.json(sucursales);
    }
    catch (error) {
        // Manejo de erroeres
        res.json({ error: error.message });
    }
}));
/**
 * @route GET /sucursales/:id
 * @param {number} :id - ID de la sucursal a buscar.
 * @desc Obtiene una sucursal por su ID.
 */
router.get('/sucursales/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const sucursal = yield sucursalController.getSucursalById(id);
        if (!sucursal) {
            return res.status(404).json({ error: 'Sucursal no encontrada' });
        }
        res.json(sucursal);
    }
    catch (error) {
        // Manejo de erro: anyres
        res.json({ error: error.message });
    }
}));
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
router.post('/sucursales', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado } = req.body;
    try {
        const sucursal = yield sucursalController.createSucursal(nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado);
        res.json(sucursal);
    }
    catch (error) {
        // Manejo de errores
        res.json({ error: error.message });
    }
}));
/**
 * @route PUT /sucursales/:id
 * @param {number} :id - ID de la sucursal a modificar.
 * @desc Modifica una sucursal por su ID.
 */
router.put('/sucursales/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado } = req.body;
    try {
        const sucursal = yield sucursalController.updateSucursal(id, nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado);
        res.json(sucursal);
    }
    catch (error) {
        // Manejo de errores
        res.json({ error: error.message });
    }
}));
/**
 * @route DELETE /sucursales/:id
 * @param {number} :id - ID de la sucursal a eliminar.
 * @desc Elimina una sucursal por su ID.
 */
router.delete('/sucursales/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        yield sucursalController.deleteSucursal(id);
        res.status(204).send();
    }
    catch (error) {
        // Manejo de errores
        res.json({ error: error.message });
    }
}));
// Ruta para obtener todos los vendedores
router.get('/vendedores', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendedores = yield catalogoVendedorController.getAllVendedores();
        res.json(vendedores);
    }
    catch (error) {
        // Manejar errores aquí
        next(error);
    }
}));
// Ruta para obtener un vendedor por su ID
router.get('/vendedores/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const vendedor = yield catalogoVendedorController.getVendedorById(id);
        if (!vendedor) {
            return res.status(404).json({ error: 'Vendedor no encontrado' });
        }
        res.json(vendedor);
    }
    catch (error) {
        // Manejar errores aquí
        next(error);
    }
}));
// Ruta para crear un nuevo vendedor
router.post('/vendedores', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { acronimo, permisoVenta, userId } = req.body;
    try {
        const vendedor = yield catalogoVendedorController.createVendedor(acronimo, permisoVenta, userId);
        res.json(vendedor);
    }
    catch (error) {
        // Manejar errores aquí
        next(error);
    }
}));
// Ruta para actualizar un vendedor por su ID
router.put('/vendedores/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { acronimo, permisoVenta, userId } = req.body;
    try {
        const vendedor = yield catalogoVendedorController.updateVendedor(id, acronimo, permisoVenta, userId);
        res.json(vendedor);
    }
    catch (error) {
        // Manejar errores aquí
        next(error);
    }
}));
// Ruta para eliminar un vendedor por su ID
router.delete('/vendedores/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        yield catalogoVendedorController.deleteVendedor(id);
        res.status(204).send();
    }
    catch (error) {
        // Manejar errores aquí
        next(error);
    }
}));
// Rutas de ventas
/**
 * @route GET /ventas
 * @desc Obtiene todas las ventas.
 */
router.get("/ventas", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ventas = yield ventaController.getAllVentas();
        res.json(ventas);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route GET /ventas/:id
 * @param {number} :id - ID de la venta a buscar.
 * @desc Obtiene una venta por su ID.
 */
router.get("/ventas/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const venta = yield ventaController.getVentaById(id);
        if (!venta) {
            return res.status(404).json({ error: "Venta no encontrada" });
        }
        res.json(venta);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route POST /ventas
 * @desc Crea una nueva venta.
 */
router.post("/ventas", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_vendedor, id_sucursal, fecha_venta, total_venta, subtotal, iva, detallesVenta } = req.body;
    try {
        const venta = yield ventaController.crearVenta(id_vendedor, id_sucursal, fecha_venta, total_venta, subtotal, iva, detallesVenta);
        res.json(venta);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
/**
 * @route PUT /ventas/:id
 * @param {number} :id - ID de la venta a modificar.
 * @desc Actualiza una venta por su ID.
 */
router.put("/ventas/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { id_sucursal, id_vendedor, fecha_venta, total_venta, subtotal, iva } = req.body;
    try {
        const venta = yield ventaController.updateVenta(id, id_sucursal, id_vendedor, fecha_venta, total_venta, subtotal, iva);
        res.json(venta);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route DELETE /ventas/:id
 * @param {number} :id - ID de la venta a eliminar.
 * @desc Elimina una venta por su ID.
 */
router.delete("/ventas/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        yield ventaController.deleteVenta(id);
        res.status(204).send();
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
// Rutas de detalles de venta
/**
 * @route GET /detalles-venta
 * @desc Obtiene todos los detalles de venta.
 */
router.get("/detalles-venta", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const detallesVenta = yield detalleVentaController.getAllDetallesVenta();
        res.json(detallesVenta);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route GET /detalles-venta/:id
 * @param {number} :id - ID del detalle de venta a buscar.
 * @desc Obtiene un detalle de venta por su ID.
 */
router.get("/detalles-venta/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const detalleVenta = yield detalleVentaController.getDetalleVentaById(id);
        if (!detalleVenta) {
            return res.status(404).json({ error: "Detalle de venta no encontrado" });
        }
        res.json(detalleVenta);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route POST /detalles-venta
 * @desc Crea un nuevo detalle de venta.
 */
router.post("/detalles-venta", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_venta, id_producto, cantidad_vendida, precio_producto, subtotal, venta_granel } = req.body;
    try {
        const detalleVenta = yield detalleVentaController.createDetalleVenta(id_venta, id_producto, cantidad_vendida, precio_producto, subtotal, venta_granel);
        res.json(detalleVenta);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
/**
 * @route PUT /detalles-venta/:id
 * @param {number} :id - ID del detalle de venta a modificar.
 * @desc Actualiza un detalle de venta por su ID.
 */
router.put("/detalles-venta/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { id_venta, id_producto, cantidad_vendida, precio_producto, subtotal } = req.body;
    try {
        const detalleVenta = yield detalleVentaController.updateDetalleVenta(id, id_venta, id_producto, cantidad_vendida, precio_producto, subtotal);
        res.json(detalleVenta);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route DELETE /detalles-venta/:id
 * @param {number} :id - ID del detalle de venta a eliminar.
 * @desc Elimina un detalle de venta por su ID.
 */
router.delete("/detalles-venta/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        yield detalleVentaController.deleteDetalleVenta(id);
        res.status(204).send();
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
// Rutas de animales
/**
 * @route GET /animales
 * @desc Obtiene todos los animales.
 */
router.get("/animales", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animales = yield animalController.getAllAnimales();
        res.json(animales);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route GET /animales/:id
 * @param {number} :id - ID del animal a buscar.
 * @desc Obtiene un animal por su ID.
 */
router.get("/animales/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const animal = yield animalController.getAnimalById(id);
        if (!animal) {
            return res.status(404).json({ error: "Animal no encontrado" });
        }
        res.json(animal);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route POST /animales
 * @desc Crea un nuevo animal.
 */
router.post("/animales", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, nomenclatura } = req.body;
    try {
        const animal = yield animalController.createAnimal(nombre, nomenclatura);
        res.json(animal);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
/**
 * @route PUT /animales/:id
 * @param {number} :id - ID del animal a modificar.
 * @desc Actualiza un animal por su ID.
 */
router.put("/animales/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { nombre, nomenclatura } = req.body;
    try {
        const animal = yield animalController.updateAnimal(id, nombre, nomenclatura);
        res.json(animal);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route DELETE /animales/:id
 * @param {number} :id - ID del animal a eliminar.
 * @desc Elimina un animal por su ID.
 */
router.delete("/animales/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        yield animalController.deleteAnimal(id);
        res.status(204).send();
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
// Rutas de tipos de cantidad
/**
 * @route GET /tipos-cantidad
 * @desc Obtiene todos los tipos de cantidad.
 */
router.get("/tipos-cantidad", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiposCantidad = yield tipoProductoController.getAllTipoCantidad();
        res.json(tiposCantidad);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route GET /tipos-cantidad/:id
 * @param {number} :id - ID del tipo de cantidad a buscar.
 * @desc Obtiene un tipo de cantidad por su ID.
 */
router.get("/tipos-cantidad/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const tipoCantidad = yield tipoProductoController.getTipoCantidadById(id);
        if (!tipoCantidad) {
            return res.status(404).json({ error: "Tipo de cantidad no encontrado" });
        }
        res.json(tipoCantidad);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route POST /tipos-cantidad
 * @desc Crea un nuevo tipo de cantidad.
 */
router.post("/tipos-cantidad", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, nomenclatura } = req.body;
    try {
        const tipoCantidad = yield tipoProductoController.createTipoCantidad(nombre, nomenclatura);
        res.json(tipoCantidad);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
/**
 * @route PUT /tipos-cantidad/:id
 * @param {number} :id - ID del tipo de cantidad a modificar.
 * @desc Actualiza un tipo de cantidad por su ID.
 */
router.put("/tipos-cantidad/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { nombre, nomenclatura } = req.body;
    try {
        const tipoCantidad = yield tipoProductoController.updateTipoCantidad(id, nombre, nomenclatura);
        res.json(tipoCantidad);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
// Rutas para inventario_granel
/**
 * @route GET /inventario-granel
 * @desc Obtiene todos los registros de inventario granel.
 */
router.get("/inventario-granel", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventarioGranel = yield inventariogranelController.getAllInventarioGranel();
        res.json(inventarioGranel);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route GET /inventario-granel/:id
 * @param {number} :id - ID del registro de inventario granel a buscar.
 * @desc Obtiene un registro de inventario granel por su ID.
 */
router.get("/inventario-granel/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const inventarioGranel = yield inventariogranelController.getInventarioGranelById(id);
        if (!inventarioGranel) {
            return res.status(404).json({ error: "Registro de inventario granel no encontrado" });
        }
        res.json(inventarioGranel);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
/**
 * @route POST /inventario-granel
 * @desc Crea un nuevo registro de inventario granel.
 */
router.post("/inventario-granel", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto, existencias, StockMinimo, StockMaximo } = req.body;
    try {
        const inventarioGranel = yield inventariogranelController.createInventarioGranel(id_producto);
        res.json(inventarioGranel);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
/**
 * @route PUT /inventario-granel/:id
 * @param {number} :id - ID del registro de inventario granel a modificar.
 * @desc Actualiza un registro de inventario granel por su ID.
 */
router.put("/inventario-granel/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { existencias, StockMinimo, StockMaximo } = req.body;
    try {
        const inventarioGranel = yield inventariogranelController.updateInventarioGranel(id, existencias);
        res.json(inventarioGranel);
    }
    catch (error) {
        res.json({ error: error.message });
    }
}));
exports.default = router;
