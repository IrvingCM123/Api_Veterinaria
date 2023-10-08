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
exports.deleteCategoria = exports.updateCategoria = exports.createCategoria = exports.getCategoriaById = exports.getAllCategorias = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todas las categorías
function getAllCategorias() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoCategoria.findMany();
    });
}
exports.getAllCategorias = getAllCategorias;
// Obtener una categoría por su ID
function getCategoriaById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoCategoria.findUnique({
            where: { id_categoria: id },
        });
    });
}
exports.getCategoriaById = getCategoriaById;
// Crear una nueva categoría
function createCategoria(nombre, nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoCategoria.create({
            data: {
                nombre,
                nomenclatura,
            },
        });
    });
}
exports.createCategoria = createCategoria;
// Actualizar una categoría por su ID
function updateCategoria(id, nombre, nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoCategoria.update({
            where: { id_categoria: id },
            data: {
                nombre,
                nomenclatura,
            },
        });
    });
}
exports.updateCategoria = updateCategoria;
// Eliminar una categoría por su ID
function deleteCategoria(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoCategoria.delete({
            where: { id_categoria: id },
        });
    });
}
exports.deleteCategoria = deleteCategoria;
