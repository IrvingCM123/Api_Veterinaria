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
exports.deleteMarca = exports.updateMarca = exports.createMarca = exports.getMarcaById = exports.getAllMarcas = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todas las marcas
function getAllMarcas() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoMarca.findMany();
    });
}
exports.getAllMarcas = getAllMarcas;
// Obtener una marca por su ID
function getMarcaById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoMarca.findUnique({
            where: { id_marca: id },
        });
    });
}
exports.getMarcaById = getMarcaById;
// Crear una nueva marca
function createMarca(nombre, nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoMarca.create({
            data: {
                nombre,
                nomenclatura,
            },
        });
    });
}
exports.createMarca = createMarca;
// Actualizar una marca por su ID
function updateMarca(id, nombre, nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoMarca.update({
            where: { id_marca: id },
            data: {
                nombre,
                nomenclatura,
            },
        });
    });
}
exports.updateMarca = updateMarca;
// Eliminar una marca por su ID
function deleteMarca(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoMarca.delete({
            where: { id_marca: id },
        });
    });
}
exports.deleteMarca = deleteMarca;
