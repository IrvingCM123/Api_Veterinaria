"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDeleteAnimal = exports.validateUpdateAnimal = exports.validateCreateAnimal = exports.validateGetAnimalById = void 0;
const express_validator_1 = require("express-validator");
exports.validateGetAnimalById = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del animal debe ser un número válido"),
];
exports.validateCreateAnimal = [
    (0, express_validator_1.check)("nombre")
        .notEmpty()
        .withMessage("El nombre del animal es requerido"),
    (0, express_validator_1.check)("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura del animal es requerida"),
];
exports.validateUpdateAnimal = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del animal debe ser un número válido"),
    (0, express_validator_1.check)("nombre")
        .notEmpty()
        .withMessage("El nombre del animal es requerido"),
    (0, express_validator_1.check)("nomenclatura")
        .notEmpty()
        .withMessage("La nomenclatura del animal es requerida"),
];
exports.validateDeleteAnimal = [
    (0, express_validator_1.check)("id")
        .isNumeric()
        .withMessage("El ID del animal debe ser un número válido"),
];
