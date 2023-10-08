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
const usuarioController = __importStar(require("../controllers/usuarioControllers"));
const proveedorController = __importStar(require("../controllers/provedores.Controller"));
const categoriaController = __importStar(require("../controllers/categoria.Controller"));
const marcaController = __importStar(require("../controllers/marcas.Controller"));
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
    const { nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, imagen } = req.body;
    try {
        const producto = yield productoController.crearProducto(nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, imagen);
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
    const id = parseInt(req.params.id, 10);
    const { nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, imagen } = req.body;
    try {
        const producto = yield productoController.actualizarProducto(id, nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, imagen);
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
    const { nombre, nomenclatura } = req.body;
    try {
        const proveedor = yield proveedorController.createProveedor(nombre, nomenclatura);
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
exports.default = router;
