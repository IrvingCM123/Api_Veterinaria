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
exports.deleteProveedorController = exports.updateProveedorController = exports.createProveedorController = exports.getProveedorByIdController = exports.getAllProveedoresController = void 0;
const Proveedores_AccessData_1 = require("./Proveedores.AccessData");
// Obtener todos los proveedores
function getAllProveedoresController() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Proveedores_AccessData_1.getAllProveedores)();
    });
}
exports.getAllProveedoresController = getAllProveedoresController;
// Obtener un proveedor por su ID
function getProveedorByIdController(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Proveedores_AccessData_1.getProveedorById)(id);
    });
}
exports.getProveedorByIdController = getProveedorByIdController;
// Crear un nuevo proveedor
function createProveedorController(nombre, nomenclatura, direccion, ciudad, estado, telefono, email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Proveedores_AccessData_1.createProveedor)(nombre, nomenclatura, direccion, ciudad, estado, telefono, email);
    });
}
exports.createProveedorController = createProveedorController;
// Actualizar un proveedor por su ID
function updateProveedorController(id, nombre, nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Proveedores_AccessData_1.updateProveedor)(id, nombre, nomenclatura);
    });
}
exports.updateProveedorController = updateProveedorController;
// Eliminar un proveedor por su ID
function deleteProveedorController(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Proveedores_AccessData_1.deleteProveedor)(id);
    });
}
exports.deleteProveedorController = deleteProveedorController;
