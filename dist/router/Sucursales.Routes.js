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
const SucursalesController = __importStar(require("../controllers/CatalogoSucursales/Sucursales.Logic"));
const router = (0, express_1.Router)();
// Rutas para el controlador de sucursales
/**
 *  @route GET api/sucursales
 *  @desc Get All Sucursales
 *  @access Public
 *  @params null
 *  @return json con todos los sucursales
 */
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sucursales = yield SucursalesController.getAllSucursalesController();
        res.status(200).json(sucursales);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route GET api/sucursales/:id
 *  @desc Get An Sucursal
 *  @access Public
 *  @params id
 *  @return json con el sucursal solicitado
 */
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const sucursal = yield SucursalesController.getSucursalByIdController(id);
        res.status(200).json(sucursal);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route POST api/sucursales
 *  @desc Create An Sucursal
 *  @access Public
 *  @params -nombre: string, -direccion: string, -ciudad: string, -estado: string, -codigoPostal: string, -telefono: string, -encargado: string
 *  @return json con el sucursal creado
 */
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado } = req.body;
    try {
        const sucursal = yield SucursalesController.createSucursalController(nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado);
        res.status(200).json(sucursal);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route PUT api/sucursales/:id
 *  @desc Update An Sucursal
 *  @access Public
 *  @params id, -nombre: string, -direccion: string, -ciudad: string, -estado: string, -codigoPostal: string, -telefono: string, -encargado: string
 *  @return json con el sucursal actualizado
 */
router.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado } = req.body;
    try {
        const sucursal = yield SucursalesController.updateSucursalController(id, nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado);
        res.status(200).json(sucursal);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route DELETE api/sucursales/:id
 *  @desc Delete An Sucursal
 *  @access Public
 *  @params id
 *  @return json con el sucursal eliminado
 */
router.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const sucursal = yield SucursalesController.deleteSucursalController(id);
        res.status(200).json(sucursal);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
