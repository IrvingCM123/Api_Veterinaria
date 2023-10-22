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
const MarcasController = __importStar(require("../controllers/CatalogoMarcas/Marcas.Logic"));
const router = (0, express_1.Router)();
// Rutas para el controlador de marcas
/**
 *  @route GET api/marcas
 *  @desc Get All Marcas
 *  @access Public
 *  @params null
 *  @return json con todos las marcas
 */
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const marcas = yield MarcasController.getAllMarcasController();
        res.status(200).json(marcas);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route GET api/marcas/:id
 *  @desc Get An Marca
 *  @access Public
 *  @params id
 *  @return json con la marca solicitada
 */
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const marca = yield MarcasController.getMarcaByIdController(id);
        res.status(200).json(marca);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route POST api/marcas
 *  @desc Create An Marca
 *  @access Public
 *  @params -nombre: string, -nomenclatura: string
 *  @return json con la marca creada
 */
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, nomenclatura } = req.body;
    try {
        const marca = yield MarcasController.createMarcaController(nombre, nomenclatura);
        res.status(200).json(marca);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route PUT api/marcas/:id
 *  @desc Update An Marca
 *  @access Public
 *  @params id, -nombre: string, -nomenclatura: string
 *  @return json con la marca actualizada
 */
router.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { nombre, nomenclatura } = req.body;
    try {
        const marca = yield MarcasController.updateMarcaController(id, nombre, nomenclatura);
        res.status(200).json(marca);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route DELETE api/marcas/:id
 *  @desc Delete An Marca
 *  @access Public
 *  @params id
 *  @return json con la marca eliminada
 */
router.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const marca = yield MarcasController.deleteMarcaController(id);
        res.status(200).json(marca);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
