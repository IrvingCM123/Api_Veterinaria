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
exports.deleteProveedor = exports.updateProveedor = exports.createProveedor = exports.getProveedorById = exports.getAllProveedores = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todos los proveedores
function getAllProveedores() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoProveedor.findMany();
    });
}
exports.getAllProveedores = getAllProveedores;
// Obtener un proveedor por su ID
function getProveedorById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoProveedor.findUnique({
            where: { id_proveedor: id },
        });
    });
}
exports.getProveedorById = getProveedorById;
// Crear un nuevo proveedor
function createProveedor(nombre, nomenclatura, direccion, ciudad, estado, telefono, email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoProveedor.create({
            data: {
                nombre,
                nomenclatura,
                direccion,
                ciudad,
                estado,
                telefono,
                email,
            },
        });
    });
}
exports.createProveedor = createProveedor;
// Actualizar un proveedor por su ID
function updateProveedor(id, nombre, nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoProveedor.update({
            where: { id_proveedor: id },
            data: {
                nombre,
                nomenclatura,
            },
        });
    });
}
exports.updateProveedor = updateProveedor;
// Eliminar un proveedor por su ID
function deleteProveedor(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.catalogoProveedor.delete({
            where: { id_proveedor: id },
        });
    });
}
exports.deleteProveedor = deleteProveedor;
