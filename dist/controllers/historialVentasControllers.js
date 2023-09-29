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
exports.registrarVenta = void 0;
const firebaseConfig_1 = require("../database/firebase/firebaseConfig");
const express_validator_1 = require("express-validator");
const db = firebaseConfig_1.firebaseAdmin.firestore();
const historial_ventaCollection = db.collection("historial_venta");
const registrarVenta = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
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
    }
    catch (error) {
        console.error("Error al registrar la venta:", error);
        res.status(500).json({ error: "Error al registrar la venta" });
    }
});
exports.registrarVenta = registrarVenta;
