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
const TipoProductoController = __importStar(require("../controllers/CatalogoTipoProducto/TipoProducto.Logic"));
const router = (0, express_1.Router)();
// Rutas para el controlador de tipo producto
/**
 *  @route GET api/tipoProducto
 *  @desc Get All TipoProducto
 *  @access Public
 *  @params null
 *  @return json con todos los tipo producto
 */
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tipoProducto = yield TipoProductoController.getAllTipoCantidadNegocio();
        res.status(200).json(tipoProducto);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route GET api/tipoProducto/:id
 *  @desc Get An TipoProducto
 *  @access Public
 *  @params id
 *  @return json con el tipo producto solicitado
 */
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const tipoProducto = yield TipoProductoController.getTipoCantidadByIdNegocio(id);
        res.status(200).json(tipoProducto);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route POST api/tipoProducto
 *  @desc Create An TipoProducto
 *  @access Public
 *  @params -nombre: string, -nomenclatura: string
 *  @return json con el tipo producto creado
 */
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, nomenclatura } = req.body;
    const data = { nombre, nomenclatura };
    try {
        const tipoProducto = yield TipoProductoController.createTipoCantidadNegocio(data);
        res.status(200).json(tipoProducto);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route PUT api/tipoProducto/:id
 *  @desc Update An TipoProducto
 *  @access Public
 *  @params id, -nombre: string, -nomenclatura: string
 *  @return json con el tipo producto actualizado
 */
router.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { nombre, nomenclatura } = req.body;
    const data = { nombre, nomenclatura };
    try {
        const tipoProducto = yield TipoProductoController.updateTipoCantidadNegocio(id, data);
        res.status(200).json(tipoProducto);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route DELETE api/tipoProducto/:id
 *  @desc Delete An TipoProducto
 *  @access Public
 *  @params id
 *  @return json con el tipo producto eliminado
 */
router.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const tipoProducto = yield TipoProductoController.deleteTipoCantidadNegocio(id);
        res.status(200).json(tipoProducto);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
