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
exports.eliminarProductoNegocio = exports.actualizarProductoNegocio = exports.crearProductoNegocio = exports.obtenerProductoPorIdNegocio = exports.obtenerProductosNegocio = void 0;
const Productos_AccessData_1 = require("./Productos.AccessData");
function obtenerProductosNegocio() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Productos_AccessData_1.obtenerProductos)();
    });
}
exports.obtenerProductosNegocio = obtenerProductosNegocio;
function obtenerProductoPorIdNegocio(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Productos_AccessData_1.obtenerProductoPorId)(id);
    });
}
exports.obtenerProductoPorIdNegocio = obtenerProductoPorIdNegocio;
function crearProductoNegocio(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Productos_AccessData_1.crearProducto)(data);
    });
}
exports.crearProductoNegocio = crearProductoNegocio;
function actualizarProductoNegocio(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Productos_AccessData_1.actualizarProducto)(id, data);
    });
}
exports.actualizarProductoNegocio = actualizarProductoNegocio;
function eliminarProductoNegocio(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Productos_AccessData_1.eliminarProducto)(id);
    });
}
exports.eliminarProductoNegocio = eliminarProductoNegocio;
