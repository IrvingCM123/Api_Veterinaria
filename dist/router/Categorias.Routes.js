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
const CategoriasController = __importStar(require("../controllers/CatalogoCategoria/Categoria.Logic"));
const Categoria_Middleware_1 = require("../middleware/Categoria/Categoria.Middleware");
const Categoria_Validator_1 = require("../Validators/CatalogoCategoria/Categoria.Validator");
const router = (0, express_1.Router)();
// Rutas para el controlador de categorias
/**
 *  @route GET api/categorias
 *  @desc Get All Categorias
 *  @access Public
 *  @params null
 *  @validation validateGetAllCategorias, handleValidationErrors
 *  @return json con todas las categorias
 */
router.get("/", Categoria_Validator_1.validateGetAllCategorias, Categoria_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorias = yield CategoriasController.getAllCategoriasController();
        res.status(200).json(categorias);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route GET api/categorias/:id
 *  @desc Get An Categoria
 *  @access Public
 *  @params id
 *  @validation validateGetCategoriaById, handleValidationErrors
 *  @return json con la categoria solicitada
 */
router.get("/:id", Categoria_Validator_1.validateGetCategoriaById, Categoria_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const categoria = yield CategoriasController.getCategoriaByIdController(id);
        res.status(200).json(categoria);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route POST api/categorias
 *  @desc Create An Categoria
 *  @access Public
 *  @params -nombre: string, -nomenclatura: string
 *  @validation validateCreateCategoria, handleValidationErrors
 *  @return json con la categoria creada
 */
router.post("/", Categoria_Validator_1.validateCreateCategoria, Categoria_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, nomenclatura } = req.body;
    try {
        const categoria = yield CategoriasController.createCategoriaController(nombre, nomenclatura);
        res.status(200).json(categoria);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route PUT api/categorias/:id
 *  @desc Update An Categoria
 *  @access Public
 *  @params id, -nombre: string, -nomenclatura: string
 *  @validation validateUpdateCategoria, handleValidationErrors
 *  @return json con la categoria actualizada
 */
router.put("/:id", Categoria_Validator_1.validateUpdateCategoria, Categoria_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { nombre, nomenclatura } = req.body;
    try {
        const categoria = yield CategoriasController.updateCategoriaController(id, nombre, nomenclatura);
        res.status(200).json(categoria);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route DELETE api/categorias/:id
 *  @desc Delete An Categoria
 *  @access Public
 *  @params id
 *  @validation validateDeleteCategoria, handleValidationErrors
 *  @return json con la categoria eliminada
 */
router.delete("/:id", Categoria_Validator_1.validateDeleteCategoria, Categoria_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const categoria = yield CategoriasController.deleteCategoriaController(id);
        res.status(200).json(categoria);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
