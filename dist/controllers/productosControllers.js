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
exports.crearProducto = exports.modificarProducto = exports.eliminarProducto = exports.buscarProducto = exports.obtenerProductos = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const obtenerProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield prisma.productos.findMany();
        res.json(productos);
    }
    catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});
exports.obtenerProductos = obtenerProductos;
const buscarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const producto = yield prisma.productos.findUnique({
            where: { id },
        });
        res.json(producto);
    }
    catch (error) {
        console.error("Error al buscar el producto:", error);
        res.status(500).json({ error: "Error al buscar el producto" });
    }
});
exports.buscarProducto = buscarProducto;
const eliminarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.productos.delete({
            where: { id },
        });
        res.json({ message: "Producto eliminado" });
    }
    catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
});
exports.eliminarProducto = eliminarProducto;
const modificarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productoDetectado = req.body;
    try {
        yield prisma.productos.update({
            where: { id },
            data: productoDetectado,
        });
        res.json({ message: "Producto modificado" });
    }
    catch (error) {
        console.error("Error al modificar el producto:", error);
        res.status(500).json({ error: "Error al modificar el producto" });
    }
});
exports.modificarProducto = modificarProducto;
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productoDetectado = req.body;
    try {
        yield prisma.productos.create({
            data: productoDetectado,
        });
        res.json({ message: "Producto creado" });
    }
    catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ error: "Error al crear el producto" });
    }
});
exports.crearProducto = crearProducto;
