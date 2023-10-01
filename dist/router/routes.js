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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const productoController = __importStar(require("../controllers/productosControllers"));
const historialController = __importStar(require("../controllers/historialVentasControllers"));
const usuarioController = __importStar(require("../controllers/usuarioControllers"));
const Venta_Validator_1 = require("../Validators/Venta_Validator");
const Usuario_Validator_1 = require("../Validators/Usuario_Validator");
const Producto_Validator_1 = require("../Validators/Producto_Validator");
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
router.get("/productos", productoController.obtenerProductos);
/**
 * @route GET /productosid/:id
 * @param {string} :id - ID del producto a buscar.
 * @desc Busca un producto por su ID.
 */
router.get("/productosid/:id", Producto_Validator_1.BuscarProductoValidador, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    productoController.buscarProducto(req, res);
});
/**
 * @route POST /productos
 * @param {string} nombre - Nombre del producto.
 * @param {number} precio - Precio del producto.
 * @desc Crea un nuevo producto.
 */
router.post("/productos", Producto_Validator_1.productoValidator, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
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
router.put("/productos/:id", Producto_Validator_1.ModificarProducto, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    productoController.modificarProducto(req, res);
});
/**
 * @route DELETE /productos/:id
 * @param {string} :id - ID del producto a eliminar.
 * @desc Elimina un producto por su ID.
 */
router.delete("/productos/:id", Producto_Validator_1.EliminarProducto, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    productoController.eliminarProducto(req, res);
});
// Rutas de ventas
/**
 * @route POST /ventas
 * @param {string} nombre - Nombre del producto.
 * @param {number} precio - Precio del producto.
 * @desc Registra una venta.
 */
router.post("/ventas", Venta_Validator_1.validarVenta, (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    historialController.registrarVenta(req, res, next);
});
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
router.get("/ventasid/:id", (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    historialController.obtenerInfoDocumento(req, res, next);
});
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
exports.default = router;
