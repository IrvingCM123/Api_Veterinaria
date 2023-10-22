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
exports.deleteSucursalController = exports.updateSucursalController = exports.createSucursalController = exports.getSucursalByIdController = exports.getAllSucursalesController = void 0;
const Sucursales_AccessData_1 = require("./Sucursales.AccessData");
// Obtener todas las sucursales
function getAllSucursalesController() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Sucursales_AccessData_1.getAllSucursales)();
    });
}
exports.getAllSucursalesController = getAllSucursalesController;
// Obtener una sucursal por su ID
function getSucursalByIdController(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Sucursales_AccessData_1.getSucursalById)(id);
    });
}
exports.getSucursalByIdController = getSucursalByIdController;
// Crear una nueva sucursal
function createSucursalController(nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Sucursales_AccessData_1.createSucursal)(nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado);
    });
}
exports.createSucursalController = createSucursalController;
// Actualizar una sucursal por su ID
function updateSucursalController(id, nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Sucursales_AccessData_1.updateSucursal)(id, nombre, direccion, ciudad, estado, codigoPostal, telefono, encargado);
    });
}
exports.updateSucursalController = updateSucursalController;
// Eliminar una sucursal por su ID
function deleteSucursalController(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Sucursales_AccessData_1.deleteSucursal)(id);
    });
}
exports.deleteSucursalController = deleteSucursalController;
