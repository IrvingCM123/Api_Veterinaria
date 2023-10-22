import { ValidationError, validationResult } from "express-validator";
import { Request } from "express-validator/src/base";

// Middleware para manejar la validación y enviar errores si los hay
export function handleValidationErrors(req: any, res: any, next: any) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
