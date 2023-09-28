import { firebaseAdmin } from "../database/firebase/firebaseConfig";
import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { validarVenta } from "../Validators/Venta_Validator";

const db = firebaseAdmin.firestore();
const historial_ventaCollection = db.collection("historial_venta");

export const registrarVenta = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const ventaDetectada = req.body;

        const fechaVenta = ventaDetectada.fecha;

        const nombreDocumento = `${fechaVenta}`;

        historial_ventaCollection
            .doc(nombreDocumento)
            .set(ventaDetectada)
            .then(() => {
                console.log("Documento agregado con nombre:", nombreDocumento);
            })
            .catch((error) => {
                console.error("Error al agregar el documento:", error);
            });

        res.json({ message: "Venta registrada" });
    } catch (error) {
        console.error("Error al registrar la venta:", error);
        res.status(500).json({ error: "Error al registrar la venta" });
    }
};
