const { check, validationResult } = require("express-validator");

export const usuarioValidator = [
  check("nombre").notEmpty().withMessage("El nombre del usuario es requerido"),
  check("apellido")
    .notEmpty()
    .withMessage("El apellido del usuario es requerido"),
  check("email").notEmpty().withMessage("El email del usuario es requerido"),
  check("password")
    .notEmpty()
    .withMessage("El password del usuario es requerido"),
  check("telefono")
    .notEmpty()
    .withMessage("El telefono del usuario es requerido"),
  check("direccion")
    .notEmpty()
    .withMessage("La direccion del usuario es requerido"),
  check("rol").notEmpty().withMessage("El rol del usuario es requerido"),
];

export const InicioSesion = [
  check("email").notEmpty().withMessage("El email del usuario es requerido"),
  check("password")
    .notEmpty()
    .withMessage("El password del usuario es requerido"),
];

export const validarUsuario = (req: any, res: any, next: any) => {
  const errores = validationResult(req);
  if (errores.isEmpty()) {
    return next();
  }
  const err: any = new Error("Error de validación");
  err.status = 422;
  err.errors = errores.array();
  next(err);
};

module.exports = { usuarioValidator, InicioSesion, validarUsuario };