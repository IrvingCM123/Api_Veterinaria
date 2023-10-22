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
const UsuariosController = __importStar(require("../controllers/Usuario/Usuarios.Logic"));
const router = (0, express_1.Router)();
// Rutas para el controlador de usuarios
/**
 *  @route GET api/usuarios
 *  @desc Get All Usuarios
 *  @access Public
 *  @params null
 *  @return json con todos los usuarios
 */
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield UsuariosController.obtenerUsuariosNegocio();
        res.status(200).json(usuarios);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route GET api/usuarios/:id
 *  @desc Get An Usuario
 *  @access Public
 *  @params id
 *  @return json con el usuario solicitado
 */
router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.id;
    try {
        const usuario = yield UsuariosController.obtenerUsuarioNegocio(email);
        res.status(200).json(usuario);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route POST api/usuarios
 *  @desc Create An Usuario
 *  @access Public
 *  @params -email: string, -password: string, -nombre: string, -apellido: string, -telefono: string, -direccion: string, -imagen: string
 *  @return json con el usuario creado
 */
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, nombre, apellido, telefono, direccion, imagen } = req.body;
    try {
        const usuario = yield UsuariosController.crearUsuarioNegocio(email, password, nombre, apellido, telefono, direccion, imagen);
        res.status(200).json(usuario);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route PUT api/usuarios/:id
 *  @desc Update An Usuario
 *  @access Public
 *  @params id, -email: string, -password: string, -nombre: string, -apellido: string, -telefono: string, -direccion: string, -imagen: string
 *  @return json con el usuario actualizado
 */
router.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    const { email, password, nombre, apellido, telefono, direccion, imagen } = req.body;
    try {
        const usuario = yield UsuariosController.actualizarUsuarioNegocio(id, email, password, nombre, apellido, telefono, direccion, imagen);
        res.status(200).json(usuario);
    }
    catch (error) {
        next(error);
    }
}));
/**
 *  @route DELETE api/usuarios/:id
 *  @desc Delete An Usuario
 *  @access Public
 *  @params id
 *  @return json con el usuario eliminado
 */
router.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        const usuario = yield UsuariosController.eliminarUsuarioNegocio(id);
        res.status(200).json(usuario);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
