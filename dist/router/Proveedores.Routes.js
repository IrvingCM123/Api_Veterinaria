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
const ProveedoresController = __importStar(require("../controllers/CatalogoProveedores/Proveedores.Logic"));
const Proveedores_Middleware_1 = require("../middleware/Proveedores/Proveedores.Middleware");
const Proveedores_Validator_1 = require("../Validators/Proveedores/Proveedores.Validator");
const router = (0, express_1.Router)();
// Rutas para el controlador de proveedores
/**
 *  @route GET api/proveedores
 *  @desc Get All Proveedores
 *  @access Public
 *  @params null
 *  @validation validateGetAllProveedoresController, handleValidationErrors
 *  @return json con todos los proveedores
 */
router.get("/", Proveedores_Validator_1.validateGetAllProveedoresController, Proveedores_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const proveedores = yield ProveedoresController.getAllProveedoresController();
        res.status(200).json(proveedores);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route GET api/proveedores/:id
 *  @desc Get An Proveedor
 *  @access Public
 *  @params id
 *  @validation validateGetProveedorByIdController, handleValidationErrors
 *  @return json con el proveedor solicitado
 */
router.get("/:id", Proveedores_Validator_1.validateGetProveedorByIdController, Proveedores_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const proveedor = yield ProveedoresController.getProveedorByIdController(id);
        res.status(200).json(proveedor);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route POST api/proveedores
 *  @desc Create An Proveedor
 *  @access Public
 *  @params -nombre: string, -nomenclatura: string, -direccion: string, -ciudad: string, -estado: string, -telefono: string, -email: string
 *  @validation validateCreateProveedorController, handleValidationErrors
 *  @return json con el proveedor creado
 */
router.post("/", Proveedores_Validator_1.validateCreateProveedorController, Proveedores_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, nomenclatura, direccion, ciudad, estado, telefono, email } = req.body;
    try {
        const proveedor = yield ProveedoresController.createProveedorController(nombre, nomenclatura, direccion, ciudad, estado, telefono, email);
        res.status(200).json(proveedor);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route PUT api/proveedores/:id
 *  @desc Update An Proveedor
 *  @access Public
 *  @params id, -nombre: string, -nomenclatura: string -direccion: string, -ciudad: string, -estado: string, -telefono: string, -email: string
 *  @validation validateUpdateProveedorController, handleValidationErrors
 *  @return json con el proveedor actualizado
 */
router.put("/:id", Proveedores_Validator_1.validateUpdateProveedorController, Proveedores_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { nombre, nomenclatura, direccion, ciudad, estado, telefono, email } = req.body;
    try {
        const proveedor = yield ProveedoresController.updateProveedorController(id, nombre, nomenclatura, direccion, ciudad, estado, telefono, email);
        res.status(200).json(proveedor);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route DELETE api/proveedores/:id
 *  @desc Delete An Proveedor
 *  @access Public
 *  @params id
 *  @validation validateDeleteProveedorController, handleValidationErrors
 *  @return json con el proveedor eliminado
 */
router.delete("/:id", Proveedores_Validator_1.validateDeleteProveedorController, Proveedores_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const proveedor = yield ProveedoresController.deleteProveedorController(id);
        res.status(200).json(proveedor);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
