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
exports.eliminarProducto = exports.actualizarProducto = exports.crearProducto = exports.obtenerProductoPorId = exports.obtenerProductos = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Obtener todos los productos
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
// Obtener un producto por su ID
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
// Obtener el ID de proveedor por su nomenclatura
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
// Obtener el ID de marca por su nomenclatura
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
// Obtener el ID de categoría por su nomenclatura
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
;
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
;
// Crear un nuevo producto con las consultas a proveedor, marca y categoría
function crearProducto(nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, imagen, cantidad, nomenclaturaAnimal, nomenclaturaTipoCantidad, precio_granel, venta_granel, codigo_barras) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_proveedor = yield obtenerIdProveedorPorNomenclatura(nomenclaturaProveedor);
        const id_marca = yield obtenerIdMarcaPorNomenclatura(nomenclaturaMarca);
        const id_categoria = yield obtenerIdCategoriaPorNomenclatura(nomenclaturaCategoria);
        const id_animal = yield obtenerIdAnimalPorNomenclatura(nomenclaturaAnimal);
        const id_tipoCantidad = yield obtenerIDCantidadPorNomenclatura(nomenclaturaTipoCantidad);
        return yield prisma.productos.create({
            data: {
                nombre,
                descripcion,
                precio,
                id_marca,
                id_proveedor,
                id_categoria,
                imagen,
                cantidad,
                id_animal,
                id_tipoCantidad,
                precio_granel: venta_granel ? precio_granel : null,
                venta_granel,
                codigo_barras,
            },
            include: {
                marca: true,
                proveedor: true,
                categoria: true,
                inventario: true,
            },
        });
    });
}
exports.crearProducto = crearProducto;
// Actualizar un producto por su ID o por su nomenclatura de proveedor, marca y categoría
function actualizarProducto(id, nombre, descripcion, precio, nomenclaturaProveedor, nomenclaturaMarca, nomenclaturaCategoria, imagen, cantidad, nomenclaturaAnimal, nomenclaturaTipoCantidad, precio_granel, venta_granel) {
    return __awaiter(this, void 0, void 0, function* () {
        const id_proveedor = yield obtenerIdProveedorPorNomenclatura(nomenclaturaProveedor);
        const id_marca = yield obtenerIdMarcaPorNomenclatura(nomenclaturaMarca);
        const id_categoria = yield obtenerIdCategoriaPorNomenclatura(nomenclaturaCategoria);
        const id_animal = yield obtenerIdAnimalPorNomenclatura(nomenclaturaAnimal);
        const id_tipoCantidad = yield obtenerIDCantidadPorNomenclatura(nomenclaturaTipoCantidad);
        return yield prisma.productos.update({
            where: { id },
            data: {
                nombre,
                descripcion,
                precio,
                id_marca,
                id_proveedor,
                id_categoria,
                imagen,
                cantidad,
                id_animal,
                id_tipoCantidad,
                precio_granel: venta_granel ? precio_granel : null,
                venta_granel,
            },
            include: {
                marca: true,
                proveedor: true,
                categoria: true,
                inventario: true,
            },
        });
    });
}
exports.actualizarProducto = actualizarProducto;
// Eliminar un producto por su ID
function eliminarProducto(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma.productos.delete({
            where: { id },
        });
    });
}
exports.eliminarProducto = eliminarProducto;
