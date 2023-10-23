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
function iniciarSesion(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.user.findUnique({
            where: { email: email },
        });
    });
}
exports.iniciarSesion = iniciarSesion;
function obtenerUsuarios() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.user.findMany();
    });
}
exports.obtenerUsuarios = obtenerUsuarios;
function obtenerUsuario(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.user.findUnique({
            where: { email: email },
        });
    });
}
exports.obtenerUsuario = obtenerUsuario;
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
function updateUsuario(id, email, password, nombre, apellido, telefono, direccion, imagen) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.user.update({
            where: { id_usuario: Number(id) },
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
function deleteUsuario(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.user.delete({
            where: { id_usuario: Number(id) },
        });
    });
}
exports.deleteUsuario = deleteUsuario;
