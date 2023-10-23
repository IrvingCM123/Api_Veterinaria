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
exports.eliminarInventario = exports.actualizarInventario = exports.crearNuevoInventario = exports.obtenerInventarioPorId = exports.obtenerInventarioPorProducto = exports.obtenerTodosLosInventarios = void 0;
// Importa las funciones de acceso a datos de la capa de acceso a datos
const Inventario_AccessData_1 = require("./Inventario.AccessData");
// Obtener todos los registros de inventario
function obtenerTodosLosInventarios() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Inventario_AccessData_1.getAllInventario)();
    });
}
exports.obtenerTodosLosInventarios = obtenerTodosLosInventarios;
// Obtener un registro de inventario por nombre de producto
function obtenerInventarioPorProducto(producto) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Inventario_AccessData_1.getInventarioByProducto)(producto);
    });
}
exports.obtenerInventarioPorProducto = obtenerInventarioPorProducto;
// Obtener un registro de inventario por su ID de producto
function obtenerInventarioPorId(id_producto) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Inventario_AccessData_1.getInventarioByProductId)(id_producto);
    });
}
exports.obtenerInventarioPorId = obtenerInventarioPorId;
// Crear un nuevo registro de inventario
function crearNuevoInventario(id_producto, existencias, StockMinimo, StockMaximo) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Inventario_AccessData_1.createInventario)(id_producto, existencias, StockMinimo, StockMaximo);
    });
}
exports.crearNuevoInventario = crearNuevoInventario;
// Actualizar un registro de inventario por su ID de producto
function actualizarInventario(id_producto, existencias, StockMinimo, StockMaximo) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Inventario_AccessData_1.updateInventario)(id_producto, existencias, StockMinimo, StockMaximo);
    });
}
exports.actualizarInventario = actualizarInventario;
// Eliminar un registro de inventario por su ID de producto
function eliminarInventario(id_producto) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, Inventario_AccessData_1.deleteInventario)(id_producto);
    });
}
exports.eliminarInventario = eliminarInventario;
