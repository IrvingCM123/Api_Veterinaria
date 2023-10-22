"use strict";
// inventarioGranelService.js
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
exports.eliminarInventarioGranel = exports.actualizarInventarioGranel = exports.crearNuevoInventarioGranel = exports.obtenerInventarioGranelPorId = exports.obtenerTodosLosInventariosGranel = void 0;
// Importa las funciones de acceso a datos de la capa de acceso a datos
const InventarioGranel_AccessData_1 = require("./InventarioGranel.AccessData");
// Obtener todos los registros de inventario granel
function obtenerTodosLosInventariosGranel() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, InventarioGranel_AccessData_1.getAllInventarioGranel)();
    });
}
exports.obtenerTodosLosInventariosGranel = obtenerTodosLosInventariosGranel;
// Obtener un registro de inventario granel por su ID
function obtenerInventarioGranelPorId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, InventarioGranel_AccessData_1.getInventarioGranelById)(id);
    });
}
exports.obtenerInventarioGranelPorId = obtenerInventarioGranelPorId;
// Crear un nuevo registro de inventario granel
function crearNuevoInventarioGranel(inventarioGranelData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, InventarioGranel_AccessData_1.createInventarioGranel)(inventarioGranelData);
    });
}
exports.crearNuevoInventarioGranel = crearNuevoInventarioGranel;
// Actualizar un registro de inventario granel por su ID
function actualizarInventarioGranel(id, inventarioGranelData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, InventarioGranel_AccessData_1.updateInventarioGranel)(id, inventarioGranelData);
    });
}
exports.actualizarInventarioGranel = actualizarInventarioGranel;
// Eliminar un registro de inventario granel por su ID
function eliminarInventarioGranel(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, InventarioGranel_AccessData_1.deleteInventarioGranel)(id);
    });
}
exports.eliminarInventarioGranel = eliminarInventarioGranel;
