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
const InventarioGranelController = __importStar(require("../controllers/InventarioGranel/InventarioGranel.Logic"));
const router = (0, express_1.Router)();
// Rutas para el controlador de inventario granel
/**
 *  @route GET api/inventariogranel
 *  @desc Get All InventarioGranel
 *  @access Public
 *  @params null
 *  @return json con todos los inventarios granel
 */
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventariogranel = yield InventarioGranelController.obtenerTodosLosInventariosGranel();
        res.status(200).json(inventariogranel);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route GET api/inventariogranel/:id
 *  @desc Get An InventarioGranel
 *  @access Public
 *  @params id
 *  @return json con el inventario granel solicitado
 */
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const inventariogranel = yield InventarioGranelController.obtenerInventarioGranelPorId(id);
        res.status(200).json(inventariogranel);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route POST api/inventariogranel
 *  @desc Create An InventarioGranel
 *  @access Public
 *  @params -id_producto: number, -cantidad_producto: string, -cantidad_restante: string
 *  @return json con el inventario granel creado
 */
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_producto, cantidad_producto, cantidad_restante } = req.body;
    const ObjetoInventarioGranel = { id_producto, cantidad_producto, cantidad_restante };
    try {
        const inventariogranel = yield InventarioGranelController.crearNuevoInventarioGranel(ObjetoInventarioGranel);
        res.status(200).json(inventariogranel);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route PUT api/inventariogranel/:id
 *  @desc Update An InventarioGranel
 *  @access Public
 *  @params id, -id_producto: number, -cantidad_producto: string, -cantidad_restante: string
 *  @return json con el inventario granel actualizado
 */
router.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { id_producto, cantidad_producto, cantidad_restante } = req.body;
    const ObjetoInventarioGranel = { id_producto, cantidad_producto, cantidad_restante };
    try {
        const inventariogranel = yield InventarioGranelController.actualizarInventarioGranel(id, ObjetoInventarioGranel);
        res.status(200).json(inventariogranel);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route DELETE api/inventariogranel/:id
 *  @desc Delete An InventarioGranel
 *  @access Public
 *  @params id
 *  @return json con el inventario granel eliminado
 */
router.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const inventariogranel = yield InventarioGranelController.eliminarInventarioGranel(id);
        res.status(200).json(inventariogranel);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
