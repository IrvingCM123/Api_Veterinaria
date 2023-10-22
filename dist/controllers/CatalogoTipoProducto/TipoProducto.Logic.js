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
exports.deleteTipoCantidadNegocio = exports.updateTipoCantidadNegocio = exports.createTipoCantidadNegocio = exports.getTipoCantidadByIdNegocio = exports.getAllTipoCantidadNegocio = void 0;
const TipoProducto_AccessData_1 = require("./TipoProducto.AccessData");
// Obtener todos los tipos de cantidad
function getAllTipoCantidadNegocio() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, TipoProducto_AccessData_1.getAllTipoCantidad)();
    });
}
exports.getAllTipoCantidadNegocio = getAllTipoCantidadNegocio;
function getTipoCantidadByIdNegocio(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, TipoProducto_AccessData_1.getTipoCantidadById)(id);
    });
}
exports.getTipoCantidadByIdNegocio = getTipoCantidadByIdNegocio;
function createTipoCantidadNegocio(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, TipoProducto_AccessData_1.createTipoCantidad)(data);
    });
}
exports.createTipoCantidadNegocio = createTipoCantidadNegocio;
function updateTipoCantidadNegocio(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, TipoProducto_AccessData_1.updateTipoCantidad)(id, data);
    });
}
exports.updateTipoCantidadNegocio = updateTipoCantidadNegocio;
function deleteTipoCantidadNegocio(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, TipoProducto_AccessData_1.deleteTipoCantidad)(id);
    });
}
exports.deleteTipoCantidadNegocio = deleteTipoCantidadNegocio;
