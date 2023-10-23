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
exports.deleteCategoriaController = exports.updateCategoriaController = exports.createCategoriaController = exports.getCategoriaByIdController = exports.getAllCategoriasController = void 0;
const Categoria_AcessData_1 = require("./Categoria.AcessData");
// Obtener todas las categorías
function getAllCategoriasController() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Categoria_AcessData_1.getAllCategorias)();
    });
}
exports.getAllCategoriasController = getAllCategoriasController;
// Obtener una categoría por su ID
function getCategoriaByIdController(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Categoria_AcessData_1.getCategoriaById)(id);
    });
}
exports.getCategoriaByIdController = getCategoriaByIdController;
// Crear una nueva categoría
function createCategoriaController(nombre, nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Categoria_AcessData_1.createCategoria)(nombre, nomenclatura);
    });
}
exports.createCategoriaController = createCategoriaController;
// Actualizar una categoría por su ID
function updateCategoriaController(id, nombre, nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Categoria_AcessData_1.updateCategoria)(id, nombre, nomenclatura);
    });
}
exports.updateCategoriaController = updateCategoriaController;
// Eliminar una categoría por su ID
function deleteCategoriaController(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Categoria_AcessData_1.deleteCategoria)(id);
    });
}
exports.deleteCategoriaController = deleteCategoriaController;
