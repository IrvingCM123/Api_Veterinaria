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
exports.deleteMarcaController = exports.updateMarcaController = exports.createMarcaController = exports.getMarcaByIdController = exports.getAllMarcasController = void 0;
const Marcas_AccessData_1 = require("./Marcas.AccessData");
// Obtener todas las marcas
function getAllMarcasController() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Marcas_AccessData_1.getAllMarcas)();
    });
}
exports.getAllMarcasController = getAllMarcasController;
// Obtener una marca por su ID
function getMarcaByIdController(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Marcas_AccessData_1.getMarcaById)(id);
    });
}
exports.getMarcaByIdController = getMarcaByIdController;
// Crear una nueva marca
function createMarcaController(nombre, nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Marcas_AccessData_1.createMarca)(nombre, nomenclatura);
    });
}
exports.createMarcaController = createMarcaController;
// Actualizar una marca por su ID
function updateMarcaController(id, nombre, nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Marcas_AccessData_1.updateMarca)(id, nombre, nomenclatura);
    });
}
exports.updateMarcaController = updateMarcaController;
// Eliminar una marca por su ID
function deleteMarcaController(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Marcas_AccessData_1.deleteMarca)(id);
    });
}
exports.deleteMarcaController = deleteMarcaController;
