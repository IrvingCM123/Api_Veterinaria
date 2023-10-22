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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.updateUsuario = exports.createUsuario = exports.obtenerUsuario = exports.obtenerUsuarios = exports.iniciarSesion = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const iniciarSesion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const usuario = yield prisma.user.findUnique({
            where: { email },
        });
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        if (usuario.password !== password) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }
        res.json(usuario);
    }
    catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
});
exports.iniciarSesion = iniciarSesion;
const obtenerUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield prisma.user.findMany();
        res.json(usuarios);
    }
    catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});
exports.obtenerUsuarios = obtenerUsuarios;
const obtenerUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        const usuario = yield prisma.user.findUnique({
            where: { email: (email) },
        });
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(usuario);
    }
    catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ error: "Error al obtener usuario" });
    }
});
exports.obtenerUsuario = obtenerUsuario;
// Crear un nuevo usuario
function createUsuario(email, password, nombre, apellido, telefono, direccion, imagen) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.user.create({
            data: {
                email,
                password,
                nombre,
                apellido,
                telefono,
                direccion,
                imagen,
            },
        });
    });
}
exports.createUsuario = createUsuario;
// Actualizar un usuario por su ID
function updateUsuario(id, email, password, nombre, apellido, telefono, direccion, imagen) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.user.update({
            where: { id_usuario: id },
            data: {
                email,
                password,
                nombre,
                apellido,
                telefono,
                direccion,
                imagen,
            },
        });
    });
}
exports.updateUsuario = updateUsuario;
// Eliminar un usuario por su ID
function deleteUsuario(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.user.delete({
            where: { id_usuario: id },
        });
    });
}
exports.deleteUsuario = deleteUsuario;
