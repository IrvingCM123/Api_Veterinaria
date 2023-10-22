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
exports.deleteInventario = exports.updateInventario = exports.createInventario = exports.getInventarioByProductId = exports.getInventarioByProducto = exports.getAllInventario = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAllInventario() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.inventario.findMany({
            include: {
                producto: true,
            },
        });
    });
}
exports.getAllInventario = getAllInventario;
function getInventarioByProducto(producto) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.productos.findFirst({
            where: { nombre: producto }
        });
    });
}
exports.getInventarioByProducto = getInventarioByProducto;
function getInventarioByProductId(id_producto) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.inventario.findUnique({
            where: { id_producto },
            include: {
                producto: true,
            },
        });
    });
}
exports.getInventarioByProductId = getInventarioByProductId;
function createInventario(id_producto, existencias, StockMinimo, StockMaximo) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.inventario.create({
            data: {
                id_producto,
                existencias,
                StockMinimo,
                StockMaximo,
            },
            include: {
                producto: true,
            },
        });
    });
}
exports.createInventario = createInventario;
function updateInventario(id_producto, existencias, StockMinimo, StockMaximo) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.inventario.update({
            where: { id_producto },
            data: {
                existencias,
                StockMinimo,
                StockMaximo,
            },
            include: {
                producto: true,
            },
        });
    });
}
exports.updateInventario = updateInventario;
function deleteInventario(id_producto) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.inventario.delete({
            where: { id_producto },
        });
    });
}
exports.deleteInventario = deleteInventario;
