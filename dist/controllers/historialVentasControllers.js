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
exports.obtenerInfoDocumento = exports.obtenerNombresDocumentos = exports.registrarVenta = void 0;
const firebaseConfig_1 = require("../database/firebase/firebaseConfig");
// Obtiene una instancia de Firestore desde firebaseAdmin
const db = firebaseConfig_1.firebaseAdmin.firestore();
// Obtiene una referencia a la colección "historial_venta" en Firestore
const historial_ventaCollection = db.collection("historial_venta");
/**
 * Controlador para registrar una venta en la base de datos.
 *
 * @param {Request} req - Objeto Request de Express.
 * @param {Response} res - Objeto Response de Express.
 * @param {NextFunction} next - Función de middleware para pasar al siguiente manejador.
 */
const registrarVenta = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Desestructura las propiedades necesarias del cuerpo de la solicitud (req.body)
        const { ProductosVendidos, TotalVenta, TotalProductosVendidos, FechaVenta, } = req.body;
        // Genera el nombre del documento basado en la fecha de venta
        const nombreDocumento = `${FechaVenta}`;
        // Obtiene la referencia al documento en Firestore
        const documento = historial_ventaCollection.doc(nombreDocumento);
        // Verifica si el documento ya existe
        const snapshot = yield documento.get();
        if (snapshot.exists) {
            // Si el documento existe, actualiza los campos en lugar de crear uno nuevo
            const datosDocumento = snapshot.data();
            const nuevosProductosVendidos = [
                ...datosDocumento.ProductosVendidos,
                ...ProductosVendidos,
            ];
            const nuevoTotalVenta = Number(datosDocumento.TotalVenta) + Number(TotalVenta);
            const nuevoTotalProductosVendidos = Number(datosDocumento.TotalProductosVendidos) +
                Number(TotalProductosVendidos);
            yield documento.update({
                ProductosVendidos: nuevosProductosVendidos,
                TotalVenta: nuevoTotalVenta,
                TotalProductosVendidos: nuevoTotalProductosVendidos,
                FechaVenta,
            });
            console.log("Documento actualizado con nombre:", nombreDocumento);
        }
        else {
            // Si el documento no existe, crea uno nuevo
            yield documento.set({
                ProductosVendidos,
                TotalVenta: TotalVenta,
                TotalProductosVendidos,
                FechaVenta,
            });
            console.log("Documento agregado con nombre:", nombreDocumento);
        }
        res.json({ message: "Venta registrada o actualizada" });
    }
    catch (error) {
        console.error("Error al registrar la venta:", error);
        res.status(500).json({ error: "Error al registrar la venta" });
    }
});
exports.registrarVenta = registrarVenta;
/**
 * Controlador para obtener todos los nombres de los documentos en la colección "historial_venta".
 *
 * @param {Request} req - Objeto Request de Express.
 * @param {Response} res - Objeto Response de Express.
 * @param {NextFunction} next - Función de middleware para pasar al siguiente manejador.
 */
const obtenerNombresDocumentos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtiene todos los documentos de la colección "historial_venta"
        const documentos = yield historial_ventaCollection.listDocuments();
        // Extrae los nombres de los documentos
        const nombresDocumentos = documentos.map((documento) => documento.id);
        res.json({ nombresDocumentos });
    }
    catch (error) {
        console.error("Error al obtener los nombres de los documentos:", error);
        res
            .status(500)
            .json({ error: "Error al obtener los nombres de los documentos" });
    }
});
exports.obtenerNombresDocumentos = obtenerNombresDocumentos;
/**
 * Controlador para obtener la información de un documento en la colección "historial_venta"
 * en base al nombre del documento.
 *
 * @param {Request} req - Objeto Request de Express.
 * @param {Response} res - Objeto Response de Express.
 * @param {NextFunction} next - Función de middleware para pasar al siguiente manejador.
 */
const obtenerInfoDocumento = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtén el nombre del documento desde los parámetros de la solicitud
        const { id } = req.params;
        // Obtiene la referencia al documento en Firestore
        const documento = historial_ventaCollection.doc(id);
        // Verifica si el documento existe
        const snapshot = yield documento.get();
        if (!snapshot.exists) {
            return res.status(404).json({ error: "Documento no encontrado" });
        }
        // Obtiene los datos del documento
        const datosDocumento = snapshot.data();
        res.json({ datosDocumento });
    }
    catch (error) {
        console.error("Error al obtener la información del documento:", error);
        res
            .status(500)
            .json({ error: "Error al obtener la información del documento" });
    }
});
exports.obtenerInfoDocumento = obtenerInfoDocumento;
