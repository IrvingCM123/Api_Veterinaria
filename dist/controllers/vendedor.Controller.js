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
exports.deleteVendedor = exports.updateVendedor = exports.createVendedor = exports.getVendedorById = exports.getAllVendedores = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todos los vendedores
function getAllVendedores() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoVendedor.findMany({
            include: {
                usuario: true,
            },
        });
    });
}
exports.getAllVendedores = getAllVendedores;
// Obtener un vendedor por su ID
function getVendedorById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoVendedor.findUnique({
            where: { id_vendedor: id },
            include: {
                usuario: true,
            },
        });
    });
}
exports.getVendedorById = getVendedorById;
// Crear un nuevo vendedor
function createVendedor(acronimo, permisoVenta, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoVendedor.create({
            data: {
                acronimo,
                permisoVenta,
                usuario: {
                    connect: {
                        id_usuario: userId,
                    },
                },
            },
            include: {
                usuario: true,
            },
        });
    });
}
exports.createVendedor = createVendedor;
// Actualizar un vendedor por su ID
function updateVendedor(id, acronimo, permisoVenta, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoVendedor.update({
            where: { id_vendedor: id },
            data: {
                acronimo,
                permisoVenta,
                usuario: {
                    connect: {
                        id_usuario: userId,
                    },
                },
            },
            include: {
                usuario: true,
            },
        });
    });
}
exports.updateVendedor = updateVendedor;
// Eliminar un vendedor por su ID
function deleteVendedor(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoVendedor.delete({
            where: { id_vendedor: id },
        });
    });
}
exports.deleteVendedor = deleteVendedor;
