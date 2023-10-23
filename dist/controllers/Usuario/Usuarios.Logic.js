"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuarioNegocio = exports.actualizarUsuarioNegocio = exports.crearUsuarioNegocio = exports.obtenerUsuarioNegocio = exports.obtenerUsuariosNegocio = exports.iniciarSesionNegocio = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Usuarios_AcessData_1 = require("./Usuarios.AcessData");
const secretKey = "Centenito";
// Obtener todos los usuarios
function iniciarSesionNegocio(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const usuario = yield (0, Usuarios_AcessData_1.iniciarSesion)(email, password);
        if (!usuario) {
            return { error: "Usuario no encontrado" };
        }
        if (usuario.password !== password) {
            return { error: "Contraseña incorrecta" };
        }
        // Si el usuario existe y la contraseña es correcta, crea un token JWT
        const token = jsonwebtoken_1.default.sign({ id: usuario.id_usuario, email: usuario.email }, secretKey);
        return { token };
    });
}
exports.iniciarSesionNegocio = iniciarSesionNegocio;
function obtenerUsuariosNegocio() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Usuarios_AcessData_1.obtenerUsuarios)();
    });
}
exports.obtenerUsuariosNegocio = obtenerUsuariosNegocio;
function obtenerUsuarioNegocio(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Usuarios_AcessData_1.obtenerUsuario)(email);
    });
}
exports.obtenerUsuarioNegocio = obtenerUsuarioNegocio;
function crearUsuarioNegocio(email, password, nombre, apellido, telefono, direccion, imagen) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Usuarios_AcessData_1.createUsuario)(email, password, nombre, apellido, telefono, direccion, imagen);
    });
}
exports.crearUsuarioNegocio = crearUsuarioNegocio;
function actualizarUsuarioNegocio(id, email, password, nombre, apellido, telefono, direccion, imagen) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Usuarios_AcessData_1.updateUsuario)(id, email, password, nombre, apellido, telefono, direccion, imagen);
    });
}
exports.actualizarUsuarioNegocio = actualizarUsuarioNegocio;
function eliminarUsuarioNegocio(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Usuarios_AcessData_1.deleteUsuario)(id);
    });
}
exports.eliminarUsuarioNegocio = eliminarUsuarioNegocio;
