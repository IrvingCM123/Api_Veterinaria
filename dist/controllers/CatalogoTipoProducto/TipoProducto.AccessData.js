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
function getAllTipoCantidad() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoTipoCantidad.findMany();
    });
}
exports.getAllTipoCantidad = getAllTipoCantidad;
function getTipoCantidadById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoTipoCantidad.findUnique({
            where: { id_tipoCantidad: id },
        });
    });
}
exports.getTipoCantidadById = getTipoCantidadById;
function createTipoCantidad(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoTipoCantidad.create(data);
    });
}
exports.createTipoCantidad = createTipoCantidad;
function updateTipoCantidad(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoTipoCantidad.update({
            where: { id_tipoCantidad: id },
            data,
        });
    });
}
exports.updateTipoCantidad = updateTipoCantidad;
function deleteTipoCantidad(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoTipoCantidad.delete({
            where: { id_tipoCantidad: id },
        });
    });
}
exports.deleteTipoCantidad = deleteTipoCantidad;
