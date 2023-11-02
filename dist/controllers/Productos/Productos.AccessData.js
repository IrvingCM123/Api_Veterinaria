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
exports.eliminarProducto = exports.actualizarProducto = exports.crearProducto = exports.obtenerIDCantidadPorNomenclatura = exports.obtenerIdAnimalPorNomenclatura = exports.obtenerIdCategoriaPorNomenclatura = exports.obtenerIdMarcaPorNomenclatura = exports.obtenerIdProveedorPorNomenclatura = exports.obtenerProductoPorId = exports.obtenerProductos = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function obtenerProductos() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.productos.findMany({
            include: {
                marca: true,
                proveedor: true,
                categoria: true,
                inventario: true,
            },
        });
    });
}
exports.obtenerProductos = obtenerProductos;
function obtenerProductoPorId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.productos.findFirst({
            where: { codigo_barras: id.toString() },
            include: {
                marca: true,
                proveedor: true,
                categoria: true,
                inventario: true,
            },
        });
    });
}
exports.obtenerProductoPorId = obtenerProductoPorId;
function obtenerIdProveedorPorNomenclatura(nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        const proveedor = yield prisma.catalogoProveedor.findFirst({
            where: { nomenclatura },
        });
        if (!proveedor) {
            throw new Error(`Proveedor con nomenclatura ${nomenclatura} no encontrado`);
        }
        return proveedor.id_proveedor;
    });
}
exports.obtenerIdProveedorPorNomenclatura = obtenerIdProveedorPorNomenclatura;
function obtenerIdMarcaPorNomenclatura(nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        const marca = yield prisma.catalogoMarca.findFirst({
            where: { nomenclatura },
        });
        if (!marca) {
            throw new Error(`Marca con nomenclatura ${nomenclatura} no encontrada`);
        }
        return marca.id_marca;
    });
}
exports.obtenerIdMarcaPorNomenclatura = obtenerIdMarcaPorNomenclatura;
function obtenerIdCategoriaPorNomenclatura(nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoria = yield prisma.catalogoCategoria.findFirst({
            where: { nomenclatura },
        });
        if (!categoria) {
            throw new Error(`Categoría con nomenclatura ${nomenclatura} no encontrada`);
        }
        return categoria.id_categoria;
    });
}
exports.obtenerIdCategoriaPorNomenclatura = obtenerIdCategoriaPorNomenclatura;
function obtenerIdAnimalPorNomenclatura(nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        const animal = yield prisma.catalagoAnimal.findFirst({
            where: { nomenclatura },
        });
        if (!animal) {
            throw new Error(`Animal con nomenclatura ${nomenclatura} no encontrado`);
        }
        return animal.id_categoria;
    });
}
exports.obtenerIdAnimalPorNomenclatura = obtenerIdAnimalPorNomenclatura;
function obtenerIDCantidadPorNomenclatura(nomenclatura) {
    return __awaiter(this, void 0, void 0, function* () {
        const tipoCantidad = yield prisma.catalogoTipoCantidad.findFirst({
            where: { nomenclatura },
        });
        if (!tipoCantidad) {
            throw new Error(`Tipo de cantidad con nomenclatura ${nomenclatura} no encontrado`);
        }
        return tipoCantidad.id_tipoCantidad;
    });
}
exports.obtenerIDCantidadPorNomenclatura = obtenerIDCantidadPorNomenclatura;
function crearProducto(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.productos.create({
            data: {
                nombre: data.nombre,
                precio: data.precio,
                cantidad: data.cantidad,
                descripcion: data.descripcion,
                imagen: data.imagen,
                id_marca: data.id_marca,
                id_categoria: data.id_categoria,
                id_proveedor: data.id_proveedor,
                id_animal: data.id_animal,
                id_tipoCantidad: data.id_tipoCantidad,
                codigo_barras: data.codigo_barras,
                venta_granel: data.venta_granel,
                precio_granel: data.precio_granel,
            }
        });
    });
}
exports.crearProducto = crearProducto;
function actualizarProducto(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.productos.update({
            where: { id },
            data,
        });
    });
}
exports.actualizarProducto = actualizarProducto;
function eliminarProducto(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.productos.delete({
            where: { id },
        });
    });
}
exports.eliminarProducto = eliminarProducto;
