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

        // Obtiene la referencia al documento en Firestore
        const documento = historial_ventaCollection.doc(nombreDocumento);

        // Verifica si el documento ya existe
        const snapshot = await documento.get();

        if (snapshot.exists) {
            // Si el documento existe, actualiza los campos en lugar de crear uno nuevo
            const datosDocumento: any = snapshot.data();

            const nuevosProductosVendidos = [
                ...datosDocumento.ProductosVendidos,
                ...ProductosVendidos,
            ];
            const nuevoTotalVenta =
                Number(datosDocumento.TotalVenta) + Number(TotalVenta);
            const nuevoTotalProductosVendidos =
                Number(datosDocumento.TotalProductosVendidos) +
                Number(TotalProductosVendidos);

            await documento.update({
                ProductosVendidos: nuevosProductosVendidos,
                TotalVenta: nuevoTotalVenta, 
                TotalProductosVendidos: nuevoTotalProductosVendidos,
                FechaVenta,
            });

            console.log("Documento actualizado con nombre:", nombreDocumento);
        } else {
            // Si el documento no existe, crea uno nuevo
            await documento.set({
                ProductosVendidos,
                TotalVenta: TotalVenta,
                TotalProductosVendidos,
                FechaVenta,
            });

            console.log("Documento agregado con nombre:", nombreDocumento);
        }

        res.json({ message: "Venta registrada o actualizada" });
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
        const { id } = req.params;

        // Obtiene la referencia al documento en Firestore
        const documento = historial_ventaCollection.doc(id);

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
        res
            .status(500)
            .json({ error: "Error al obtener la información del documento" });
    }
};


/**
 * Controlador para obtener la información de un documento en la colección "historial_venta"
 * en base al nombre del documento, donde se busca obtener las ventas por mes.
 *
 * @param {Request} req - Objeto Request de Express.
 * @param {Response} res - Objeto Response de Express.
 * @param {NextFunction} next - Función de middleware para pasar al siguiente manejador.
 */
export const obtenerInfoMes = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Obtén el nombre del documento desde los parámetros de la solicitud
        const { id } : any = req.params;

        // Utiliza el método ya establecido en el controlador para obtener la información del documento solicitado
        const informacion_Venta = await obtenerInfoDocumento(id, res, next);

        res.json({ informacion_Venta });
    } catch (error) {
        console.error("Error al obtener la información del documento:", error);
        res
            .status(500)
            .json({ error: "Error al obtener la información del documento" });
    }
};

