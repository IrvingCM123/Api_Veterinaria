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
exports.eliminarVendedor = exports.actualizarVendedor = exports.crearNuevoVendedor = exports.obtenerVendedorPorId = exports.obtenerTodosLosVendedores = void 0;
// Importa las funciones de acceso a datos de la capa de acceso a datos
const Vendedores_AccessData_1 = require("./Vendedores.AccessData");
// Obtener todos los vendedores
function obtenerTodosLosVendedores() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Vendedores_AccessData_1.getAllVendedores)();
    });
}
exports.obtenerTodosLosVendedores = obtenerTodosLosVendedores;
// Obtener un vendedor por su ID
function obtenerVendedorPorId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Vendedores_AccessData_1.getVendedorById)(id);
    });
}
exports.obtenerVendedorPorId = obtenerVendedorPorId;
// Crear un nuevo vendedor
function crearNuevoVendedor(acronimo, permisoVenta, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Vendedores_AccessData_1.createVendedor)(acronimo, permisoVenta, userId);
    });
}
exports.crearNuevoVendedor = crearNuevoVendedor;
// Actualizar un vendedor por su ID
function actualizarVendedor(id, acronimo, permisoVenta, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Vendedores_AccessData_1.updateVendedor)(id, acronimo, permisoVenta, userId);
    });
}
exports.actualizarVendedor = actualizarVendedor;
// Eliminar un vendedor por su ID
function eliminarVendedor(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Vendedores_AccessData_1.deleteVendedor)(id);
    });
}
exports.eliminarVendedor = eliminarVendedor;
