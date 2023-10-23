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
const InventarioController = __importStar(require("../controllers/Inventario/Inventario.Logic"));
const Inventario_Middleware_1 = require("../middleware/Inventario/Inventario.Middleware");
const Inventario_Validator_1 = require("../Validators/Inventario/Inventario.Validator");
const router = (0, express_1.Router)();
// Rutas para el controlador de inventario
/**
 *  @route GET api/inventario
 *  @desc Get All Inventario
 *  @access Public
 *  @params null
 *  @validation validateObtenerTodosLosInventarios, handleValidationErrors
 *  @return json con todos los inventarios
 */
router.get("/", Inventario_Validator_1.validateObtenerTodosLosInventarios, Inventario_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventario = yield InventarioController.obtenerTodosLosInventarios();
        res.status(200).json(inventario);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route GET api/inventario/:id
 *  @desc Get An Inventario
 *  @access Public
 *  @params id
 *  @validation validateObtenerInventarioPorId, handleValidationErrors
 *  @return json con el inventario solicitado
 */
router.get("/:id", Inventario_Validator_1.validateObtenerInventarioPorId, Inventario_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const inventario = yield InventarioController.obtenerInventarioPorId(id);
        res.status(200).json(inventario);
    }
    catch (error) {
        next(error);
    }
}));
/**
 * @route Get api/inventario/:producto
 * @desc Get An Inventario
 * @access Public
 * @params producto
 * @validation validateObtenerInventarioPorProducto, handleValidationErrors
 * @return json con el inventario solicitado
 */
router.get("/:producto", Inventario_Validator_1.validateObtenerInventarioPorProducto, Inventario_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const producto = req.params.producto;
    try {
        const inventario = yield InventarioController.obtenerInventarioPorProducto(producto);
        res.status(200).json(inventario);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route POST api/inventario
 *  @desc Create An Inventario
 *  @access Public
 *  @params -id_producto: number, -existencias: number, -StockMinimo: number, -StockMaximo: number
 *  @validation validateCrearNuevoInventario, handleValidationErrors
 *  @return json con el inventario creado
 */
router.post("/", Inventario_Validator_1.validateCrearNuevoInventario, Inventario_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto, existencias, StockMinimo, StockMaximo } = req.body;
    try {
        const inventario = yield InventarioController.crearNuevoInventario(id_producto, existencias, StockMinimo, StockMaximo);
        res.status(200).json(inventario);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route PUT api/inventario/:id
 *  @desc Update An Inventario
 *  @access Public
 *  @params id, -existencias: number, -StockMinimo: number, -StockMaximo: number
 *  @validation validateActualizarInventario, handleValidationErrors
 *  @return json con el inventario actualizado
 */
router.put("/:id", Inventario_Validator_1.validateActualizarInventario, Inventario_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { existencias, StockMinimo, StockMaximo } = req.body;
    try {
        const inventario = yield InventarioController.actualizarInventario(id, existencias, StockMinimo, StockMaximo);
        res.status(200).json(inventario);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route DELETE api/inventario/:id
 *  @desc Delete An Inventario
 *  @access Public
 *  @params id
 *  @validation validateEliminarInventario, handleValidationErrors
 *  @return json con el inventario eliminado
 */
router.delete("/:id", Inventario_Validator_1.validateEliminarInventario, Inventario_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const inventario = yield InventarioController.eliminarInventario(id);
        res.status(200).json(inventario);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
