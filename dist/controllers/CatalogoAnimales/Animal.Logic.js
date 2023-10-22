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
exports.deleteAnimalController = exports.updateAnimalController = exports.createAnimalController = exports.getAnimalByIdController = exports.getAllAnimalesController = void 0;
const Animal_AcessData_1 = require("./Animal.AcessData");
// Obtener todos los animales
function getAllAnimalesController() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Animal_AcessData_1.getAllAnimales)();
    });
}
exports.getAllAnimalesController = getAllAnimalesController;
// Obtener un animal por su ID
function getAnimalByIdController(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Animal_AcessData_1.getAnimalById)(id);
    });
}
exports.getAnimalByIdController = getAnimalByIdController;
// Crear un nuevo animal
function createAnimalController(nombre, nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Animal_AcessData_1.createAnimal)(nombre, nomenclatura);
    });
}
exports.createAnimalController = createAnimalController;
// Actualizar un animal por su ID
function updateAnimalController(id, nombre, nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Animal_AcessData_1.updateAnimal)(id, nombre, nomenclatura);
    });
}
exports.updateAnimalController = updateAnimalController;
// Eliminar un animal por su ID
function deleteAnimalController(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Animal_AcessData_1.deleteAnimal)(id);
    });
}
exports.deleteAnimalController = deleteAnimalController;
