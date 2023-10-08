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
exports.deleteSucursal = exports.updateSucursal = exports.createSucursal = exports.getSucursalById = exports.getAllSucursales = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todas las sucursales
function getAllSucursales() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.sucursal.findMany({
            include: {
                ventas: true,
            },
        });
    });
}
exports.getAllSucursales = getAllSucursales;
// Obtener una sucursal por su ID
function getSucursalById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.sucursal.findUnique({
            where: { id_sucursal: id },
            include: {
                ventas: true,
            }
        });
    });
}
exports.getSucursalById = getSucursalById;
// Crear una nueva sucursal
function createSucursal(nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.sucursal.create({
            data: {
                nombre,
                direccion,
                ciudad,
                estado,
                codigoPostal,
                telefono,
                encargado,
            }
        });
    });
}
exports.createSucursal = createSucursal;
// Actualizar una sucursal por su ID
function updateSucursal(id, nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.sucursal.update({
            where: { id_sucursal: id },
            data: {
                nombre,
                direccion,
                ciudad,
                estado,
                codigoPostal,
                telefono,
                encargado,
            }
        });
    });
}
exports.updateSucursal = updateSucursal;
// Eliminar una sucursal por su ID
function deleteSucursal(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.sucursal.delete({
            where: { id_sucursal: id },
        });
    });
}
exports.deleteSucursal = deleteSucursal;
