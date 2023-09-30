import { firebaseAdmin } from "../database/firebase/firebaseConfig";
import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validarVenta } from "../Validators/Venta_Validator";

// Obtiene una instancia de Firestore desde firebaseAdmin
const db = firebaseAdmin.firestore();

// Obtiene una referencia a la colección "historial_venta" en Firestore
const historial_ventaCollection = db.collection("historial_venta");

/**
 * Controlador para registrar una venta en la base de datos.
 *
 * @param {Request} req - Objeto Request de Express.
 * @param {Response} res - Objeto Response de Express.
 * @param {NextFunction} next - Función de middleware para pasar al siguiente manejador.
 */
export const registrarVenta = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Desestructura las propiedades necesarias del cuerpo de la solicitud (req.body)
        const {
            ProductosVendidos,
            TotalVenta,
            TotalProductosVendidos,
            FechaVenta,
        } = req.body;

        // Genera el nombre del documento basado en la fecha de venta
        const nombreDocumento = `${FechaVenta}`;

        // Guarda los datos de la venta en Firestore
        await historial_ventaCollection.doc(nombreDocumento).set({
            ProductosVendidos,
            TotalVenta,
            TotalProductosVendidos,
            FechaVenta,
        });

        console.log("Documento agregado con nombre:", nombreDocumento);
        res.json({ message: "Venta registrada" });
    } catch (error) {
        console.error("Error al registrar la venta:", error);
        res.status(500).json({ error: "Error al registrar la venta" });
    }
};

/**
 * Controlador para obtener todos los nombres de los documentos en la colección "historial_venta".
 *
 * @param {Request} req - Objeto Request de Express.
 * @param {Response} res - Objeto Response de Express.
 * @param {NextFunction} next - Función de middleware para pasar al siguiente manejador.
 */
export const obtenerNombresDocumentos = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Obtiene todos los documentos de la colección "historial_venta"
        const documentos = await historial_ventaCollection.listDocuments();

        // Extrae los nombres de los documentos
        const nombresDocumentos = documentos.map((documento) => documento.id);

        res.json({ nombresDocumentos });
    } catch (error) {
        console.error("Error al obtener los nombres de los documentos:", error);
        res
            .status(500)
            .json({ error: "Error al obtener los nombres de los documentos" });
    }
};


/**
 * Controlador para obtener la información de un documento en la colección "historial_venta"
 * en base al nombre del documento.
 *
 * @param {Request} req - Objeto Request de Express.
 * @param {Response} res - Objeto Response de Express.
 * @param {NextFunction} next - Función de middleware para pasar al siguiente manejador.
 */
export const obtenerInfoDocumento = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Obtén el nombre del documento desde los parámetros de la solicitud
        const { nombreDocumento } = req.params;

        // Obtiene la referencia al documento en Firestore
        const documento = historial_ventaCollection.doc(nombreDocumento);

        // Verifica si el documento existe
        const snapshot = await documento.get();
        if (!snapshot.exists) {
            return res.status(404).json({ error: "Documento no encontrado" });
        }

        // Obtiene los datos del documento
        const datosDocumento = snapshot.data();

        res.json({ datosDocumento });
    } catch (error) {
        console.error("Error al obtener la información del documento:", error);
        res.status(500).json({ error: "Error al obtener la información del documento" });
    }
};