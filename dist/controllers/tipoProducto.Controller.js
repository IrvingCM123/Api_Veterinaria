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
exports.deleteTipoCantidad = exports.updateTipoCantidad = exports.createTipoCantidad = exports.getTipoCantidadById = exports.getAllTipoCantidad = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todos los tipos de productos
function getAllTipoCantidad() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoTipoCantidad.findMany();
    });
}
exports.getAllTipoCantidad = getAllTipoCantidad;
// Obtener un tipo de producto por su ID
function getTipoCantidadById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoTipoCantidad.findUnique({
            where: { id_tipoCantidad: id },
        });
    });
}
exports.getTipoCantidadById = getTipoCantidadById;
// Crear un nuevo tipo de producto
function createTipoCantidad(nombre, nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoTipoCantidad.create({
            data: {
                nombre,
                nomenclatura
            },
        });
    });
}
exports.createTipoCantidad = createTipoCantidad;
// Actualizar un tipo de producto por su ID
function updateTipoCantidad(id, nombre, nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoTipoCantidad.update({
            where: { id_tipoCantidad: id },
            data: {
                nombre,
                nomenclatura
            },
        });
    });
}
exports.updateTipoCantidad = updateTipoCantidad;
// Eliminar un tipo de producto por su ID
function deleteTipoCantidad(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoTipoCantidad.delete({
            where: { id_tipoCantidad: id },
        });
    });
}
exports.deleteTipoCantidad = deleteTipoCantidad;
