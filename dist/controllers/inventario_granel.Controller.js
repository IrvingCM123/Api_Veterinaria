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
exports.deleteInventarioGranel = exports.updateInventarioGranel = exports.createInventarioGranel = exports.getInventarioGranelById = exports.getAllInventarioGranel = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todos los registros de inventario_granel
function getAllInventarioGranel() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.inventario_granel.findMany({
            include: {
                producto: true,
            },
        });
    });
}
exports.getAllInventarioGranel = getAllInventarioGranel;
// Obtener un registro de inventario_granel por su ID
function getInventarioGranelById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.inventario_granel.findUnique({
            where: { id_inventario_granel: id },
            include: {
                producto: true,
            },
        });
    });
}
exports.getInventarioGranelById = getInventarioGranelById;
// Crear un registro de inventario_granel
function createInventarioGranel(inventarioGranelData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.inventario_granel.create({
            data: inventarioGranelData,
        });
    });
}
exports.createInventarioGranel = createInventarioGranel;
// Actualizar un registro de inventario_granel por su ID
function updateInventarioGranel(id, inventarioGranelData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.inventario_granel.update({
            where: { id_inventario_granel: id },
            data: inventarioGranelData,
            include: {
                producto: true,
            },
        });
    });
}
exports.updateInventarioGranel = updateInventarioGranel;
// Eliminar un registro de inventario_granel por su ID
function deleteInventarioGranel(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.inventario_granel.delete({
            where: { id_inventario_granel: id },
        });
    });
}
exports.deleteInventarioGranel = deleteInventarioGranel;
