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
const ProductosController = __importStar(require("../controllers/Productos/Productos.Logic"));
const Productos_Middleware_1 = require("../middleware/Productos/Productos.Middleware");
const Productos_Validator_1 = require("../Validators/Productos/Productos.Validator");
const router = (0, express_1.Router)();
// Rutas para el controlador de productos
/**
 *  @route GET api/productos
 *  @desc Get All Productos
 *  @access Public
 *  @params null
 *  @validation validateObtenerProductosNegocio, handleValidationErrors
 *  @return json con todos los productos
 */
router.get("/", Productos_Validator_1.validateObtenerProductosNegocio, Productos_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield ProductosController.obtenerProductosNegocio();
        res.status(200).json(productos);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route GET api/productos/:id
 *  @desc Get An Producto
 *  @access Public
 *  @params id
 *  @validation validateObtenerProductoPorIdNegocio, handleValidationErrors
 *  @return json con el producto solicitado
 */
router.get("/:id", Productos_Validator_1.validateObtenerProductoPorIdNegocio, Productos_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const producto = yield ProductosController.obtenerProductoPorIdNegocio(id);
        res.status(200).json(producto);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route POST api/productos
 *  @desc Create An Producto
 *  @access Public
 *  @params -nombre: string -descripcion: string, -precio: string, -idMarca: number, -idAnimal: number, -idCategoria: number, -idProveedor: number, -imagen: string, -cantidad: string, -id_tipoCantidad: number, -codigoBarra: string, -venta_granel: boolean, -precio_granel: string
 *  @validation validateCrearProductoNegocio, handleValidationErrors
 *  @return json con el producto creado
 */
router.post("/", Productos_Validator_1.validateCrearProductoNegocio, Productos_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, precio, cantidad, descripcion, imagen, id_marca, id_categoria, id_proveedor, id_animal, id_tipoCantidad, codigo_barras, precio_granel, venta_granel, } = req.body;
    console.log(req.body);
    const productoObjeto = {
        nombre,
        precio,
        cantidad,
        descripcion,
        imagen,
        id_marca,
        id_categoria,
        id_proveedor,
        id_animal,
        id_tipoCantidad,
        codigo_barras,
        precio_granel,
        venta_granel,
    };
    try {
        const producto = yield ProductosController.crearProductoNegocio(productoObjeto);
        res.status(200).json(producto);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route PUT api/productos/:id
 *  @desc Update An Producto
 *  @access Public
 *  @params id, -nombre: string -descripcion: string, -precio: string, -idMarca: number, -idAnimal: number, -idCategoria: number, -idProveedor: number, -imagen: string, -cantidad: string, -id_tipoCantidad: number, -codigoBarra: string, -venta_granel: boolean, -precio_granel: string
 *  @validation validateActualizarProductoNegocio, handleValidationErrors
 *  @return json con el producto actualizado
 */
router.put("/:id", Productos_Validator_1.validateActualizarProductoNegocio, Productos_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { nombre, precio, cantidad, descripcion, imagen, id_marca, id_categoria, id_proveedor, id_animal, id_tipoCantidad, codigo_barras, precio_granel, venta_granel, } = req.body;
    const productoObjeto = {
        nombre,
        precio,
        cantidad,
        descripcion,
        imagen,
        id_marca,
        id_categoria,
        id_proveedor,
        id_animal,
        id_tipoCantidad,
        codigo_barras,
        precio_granel,
        venta_granel,
    };
    console.log(productoObjeto);
    try {
        const producto = yield ProductosController.actualizarProductoNegocio(id, productoObjeto);
        res.status(200).json(producto);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route DELETE api/productos/:id
 *  @desc Delete An Producto
 *  @access Public
 *  @params id
 *  @validation validateDeleteProductoNegocio, handleValidationErrors
 *  @return json con el producto eliminado
 */
router.delete("/:id", Productos_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const producto = yield ProductosController.eliminarProductoNegocio(id);
        res.status(200).json(producto);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
