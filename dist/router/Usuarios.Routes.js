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
const Usuario_Middleware_1 = require("../middleware/Usuario/Usuario.Middleware");
const Usuario_Validator_1 = require("../Validators/Usuarios/Usuario.Validator");
const router = (0, express_1.Router)();
// Rutas para el controlador de usuarios
/**
 *  @route GET api/usuarios
 *  @desc Get All Usuarios
 *  @access Public
 *  @params null
 *  @validation validateObtenerUsuariosNegocio, handleValidationErrors
 *  @return json con todos los usuarios
 */
router.get("/", Usuario_Validator_1.validateObtenerUsuariosNegocio, Usuario_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
 *  @validation validateObtenerUsuarioNegocio, handleValidationErrors
 *  @return json con el usuario solicitado
 */
router.get("/:id", Usuario_Validator_1.validateObtenerUsuarioNegocio, Usuario_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
 * @route GET api/usuarios/login
 * @desc Iniciar Sesion
 * @access Public
 * @params -email: string, -password: string
 * @validation validateIniciarSesionNegocio, handleValidationErrors
 * @return json con el token
 */
router.get("/login", Usuario_Validator_1.validateIniciarSesionNegocio, Usuario_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const usuario = yield UsuariosController.iniciarSesionNegocio(email, password);
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
 *  @validation validateCrearUsuarioNegocio, handleValidationErrors
 *  @return json con el usuario creado
 */
router.post("/", Usuario_Validator_1.validateCrearUsuarioNegocio, Usuario_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
 *  @validation validateActualizarUsuarioNegocio, handleValidationErrors
 *  @return json con el usuario actualizado
 */
router.put("/:id", Usuario_Validator_1.validateActualizarUsuarioNegocio, Usuario_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
 *  @validation validateEliminarUsuarioNegocio, handleValidationErrors
 *  @return json con el usuario eliminado
 */
router.delete("/:id", Usuario_Validator_1.validateEliminarUsuarioNegocio, Usuario_Middleware_1.handleValidationErrors, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
