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
const VendedorController = __importStar(require("../controllers/Vendedor/Vendedores.Logic"));
const Vendedor_Middleware_1 = require("../middleware/Vendedor/Vendedor.Middleware");
const Vendedor_Validator_1 = require("../Validators/Vendedores/Vendedor.Validator");
const router = (0, express_1.Router)();
// Rutas para el controlador de vendedores
/**
 *  @route GET api/vendedor
 *  @desc Get All Vendedores
 *  @access Public
 *  @params null
 *  @validation validateObtenerTodosLosVendedores, handleValidationErrors
 *  @return json con todos los vendedores
 */
router.get("/", Vendedor_Validator_1.validateObtenerTodosLosVendedores, Vendedor_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendedores = yield VendedorController.obtenerTodosLosVendedores();
        res.status(200).json(vendedores);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route GET api/vendedor/:id
 *  @desc Get An Vendedor
 *  @access Public
 *  @params id
 *  @validation validateObtenerVendedorPorId, handleValidationErrors
 *  @return json con el vendedor solicitado
 */
router.get("/:id", Vendedor_Validator_1.validateObtenerVendedorPorId, Vendedor_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const vendedor = yield VendedorController.obtenerVendedorPorId(id);
        res.status(200).json(vendedor);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route POST api/vendedor
 *  @desc Create An Vendedor
 *  @access Public
 *  @params -acronimo: string, -permisoVenta: boolean, -userId: number
 *  @validation validateCrearNuevoVendedor, handleValidationErrors
 *  @return json con el vendedor creado
 */
router.post("/", Vendedor_Validator_1.validateCrearNuevoVendedor, Vendedor_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { acronimo, permisoVenta, userId } = req.body;
    try {
        const vendedor = yield VendedorController.crearNuevoVendedor(acronimo, permisoVenta, userId);
        res.status(200).json(vendedor);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route PUT api/vendedor/:id
 *  @desc Update An Vendedor
 *  @access Public
 *  @params id, -acronimo: string, -permisoVenta: boolean, -userId: number
 *  @validation validateActualizarVendedor, handleValidationErrors
 *  @return json con el vendedor actualizado
 */
router.put("/:id", Vendedor_Validator_1.validateActualizarVendedor, Vendedor_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { acronimo, permisoVenta, userId } = req.body;
    try {
        const vendedor = yield VendedorController.actualizarVendedor(id, acronimo, permisoVenta, userId);
        res.status(200).json(vendedor);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route DELETE api/vendedor/:id
 *  @desc Delete An Vendedor
 *  @access Public
 *  @params id
 *  @validation validateEliminarVendedor, handleValidationErrors
 *  @return json con el vendedor eliminado
 */
router.delete("/:id", Vendedor_Validator_1.validateEliminarVendedor, Vendedor_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const vendedor = yield VendedorController.eliminarVendedor(id);
        res.status(200).json(vendedor);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
