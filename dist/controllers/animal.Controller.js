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
exports.deleteAnimal = exports.updateAnimal = exports.createAnimal = exports.getAnimalById = exports.getAllAnimales = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todos los animales
function getAllAnimales() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalagoAnimal.findMany();
    });
}
exports.getAllAnimales = getAllAnimales;
// Obtener un animal por su ID
function getAnimalById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalagoAnimal.findUnique({
            where: { id_categoria: id },
        });
    });
}
exports.getAnimalById = getAnimalById;
// Crear un nuevo animal
function createAnimal(nombre, nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalagoAnimal.create({
            data: {
                nombre,
                nomenclatura
            },
        });
    });
}
exports.createAnimal = createAnimal;
// Actualizar un animal por su ID
function updateAnimal(id, nombre, nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalagoAnimal.update({
            where: { id_categoria: id },
            data: {
                nombre,
                nomenclatura
            },
        });
    });
}
exports.updateAnimal = updateAnimal;
// Eliminar un animal por su ID
function deleteAnimal(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalagoAnimal.delete({
            where: { id_categoria: id },
        });
    });
}
exports.deleteAnimal = deleteAnimal;
