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
const DetalleVentaController = __importStar(require("../controllers/DetalleVenta/DetalleVenta.Logic"));
const DetalleVenta_Middleware_1 = require("../middleware/DetalleVenta/DetalleVenta.Middleware");
const DetalleVenta_Validator_1 = require("../Validators/DetalleVenta/DetalleVenta.Validator");
const router = (0, express_1.Router)();
// Rutas para el controlador de detalle de venta
/**
 *  @route GET api/detalleventa
 *  @desc Get All DetalleVenta
 *  @access Public
 *  @params null
 *  @validation validateObtenerTodosLosDetallesVenta, handleValidationErrors
 *  @return json con todos los detalles de venta
 */
router.get("/", DetalleVenta_Validator_1.validateObtenerTodosLosDetallesVenta, DetalleVenta_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const detalleventa = yield DetalleVentaController.obtenerTodosLosDetallesVenta();
        res.status(200).json(detalleventa);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route GET api/detalleventa/:id
 *  @desc Get An DetalleVenta
 *  @access Public
 *  @params id
 *  @validation validateObtenerDetalleVentaPorId, handleValidationErrors
 *  @return json con el detalle de venta solicitado
 */
router.get("/:id", DetalleVenta_Validator_1.validateObtenerDetalleVentaPorId, DetalleVenta_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const detalleventa = yield DetalleVentaController.obtenerDetalleVentaPorId(id);
        res.status(200).json(detalleventa);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route POST api/detalleventa
 *  @desc Create An DetalleVenta
 *  @access Public
 *  @params -id_venta: number, -id_producto: number, -cantidad_vendida: number, -precio_producto: number, -subtotal: number, -venta_granel: boolean
 *  @validation validateCrearNuevoDetalleVenta, handleValidationErrors
 *  @return json con el detalle de venta creado
 */
router.post("/", DetalleVenta_Validator_1.validateCrearNuevoDetalleVenta, DetalleVenta_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_venta, id_producto, cantidad_vendida, precio_producto, subtotal, venta_granel, } = req.body;
    try {
        const detalleventa = yield DetalleVentaController.crearNuevoDetalleVenta(id_venta, id_producto, cantidad_vendida, precio_producto, subtotal, venta_granel);
        res.status(200).json(detalleventa);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route PUT api/detalleventa/:id
 *  @desc Update An DetalleVenta
 *  @access Public
 *  @params id, -id_venta: number, -id_producto: number, -cantidad_vendida: number, -precio_producto: number, -subtotal: number
 *  @validation validateActualizarDetalleVenta, handleValidationErrors
 *  @return json con el detalle de venta actualizado
 */
router.put("/:id", DetalleVenta_Validator_1.validateActualizarDetalleVenta, DetalleVenta_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { id_venta, id_producto, cantidad_vendida, precio_producto, subtotal, } = req.body;
    try {
        const detalleventa = yield DetalleVentaController.actualizarDetalleVenta(id, id_venta, id_producto, cantidad_vendida, precio_producto, subtotal);
        res.status(200).json(detalleventa);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route DELETE api/detalleventa/:id
 *  @desc Delete An DetalleVenta
 *  @access Public
 *  @params id
 *  @validation validateEliminarDetalleVenta, handleValidationErrors
 *  @return json con el detalle de venta eliminado
 */
router.delete("/:id", DetalleVenta_Validator_1.validateEliminarDetalleVenta, DetalleVenta_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const detalleventa = yield DetalleVentaController.eliminarDetalleVenta(id);
        res.status(200).json(detalleventa);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
