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
const VentaController = __importStar(require("../controllers/Venta/Ventas.Logic"));
const Venta_Middleware_1 = require("../middleware/Venta/Venta.Middleware");
const Venta_Validator_1 = require("../Validators/Venta/Venta.Validator");
const router = (0, express_1.Router)();
// Rutas para el controlador de ventas
/**
 *  @route GET api/venta
 *  @desc Get All Venta
 *  @access Public
 *  @params null
 *  @validation validateObtenerTodasLasVentas, handleValidationErrors
 *  @return json con todos los venta
 */
router.get("/", Venta_Validator_1.validateObtenerTodasLasVentas, Venta_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const venta = yield VentaController.obtenerTodasLasVentas();
        res.status(200).json(venta);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route GET api/venta/:id
 *  @desc Get An Venta
 *  @access Public
 *  @params id
 *  @validation validateObtenerVentaPorId, handleValidationErrors
 *  @return json con el venta solicitado
 */
router.get("/:id", Venta_Validator_1.validateObtenerVentaPorId, Venta_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const venta = yield VentaController.obtenerVentaPorId(id);
        res.status(200).json(venta);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route POST api/venta
 *  @desc Create An Venta
 *  @access Public
 *  @params -id_vendedor: string, -id_sucursal: number, -fecha_venta: string, -total_venta: string, -subtotal: string, -iva: string, -detallesVenta: DetalleVentaInput[]
 *  @validation validateCrearNuevaVenta, handleValidationErrors
 *  @return json con el venta creado
 */
router.post("/", Venta_Validator_1.validateCrearNuevaVenta, Venta_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_vendedor, id_sucursal, fecha_venta, total_venta, subtotal, iva, detallesVenta, } = req.body;
    try {
        const venta = yield VentaController.crearNuevaVenta({
            id_vendedor,
            id_sucursal,
            fecha_venta,
            total_venta,
            subtotal,
            iva,
            detallesVenta,
        });
        res.status(200).json(venta);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route PUT api/venta/:id
 *  @desc Update An Venta
 *  @access Public
 *  @params id, -id_vendedor: string, -id_sucursal: number, -fecha_venta: string, -total_venta: string, -subtotal: string, -iva: string
 *  @validation validateActualizarVenta, handleValidationErrors
 *  @return json con el venta actualizado
 */
router.put("/:id", Venta_Validator_1.validateActualizarVenta, Venta_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { id_vendedor, id_sucursal, fecha_venta, total_venta, subtotal, iva, } = req.body;
    try {
        const venta = yield VentaController.actualizarVenta(id, {
            id_vendedor,
            id_sucursal,
            fecha_venta,
            total_venta,
            subtotal,
            iva,
            detallesVenta: [],
        });
        res.status(200).json(venta);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route DELETE api/venta/:id
 *  @desc Delete An Venta
 *  @access Public
 *  @params id
 *  @validation validateEliminarVenta, handleValidationErrors
 *  @return json con el venta eliminado
 */
router.delete("/:id", Venta_Validator_1.validateEliminarVenta, Venta_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const venta = yield VentaController.eliminarVenta(id);
        res.status(200).json(venta);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
