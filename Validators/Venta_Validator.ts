import { check, ValidationChain } from "express-validator";

/**
 * Validador para la estructura general de la venta. Este validador se utiliza para validar
 * los datos enviados en una solicitud de registro de venta antes de almacenarlos en la base de datos.
 * Se asegura de que los datos cumplan con los requisitos específicos.
 */

export const validarVenta: ValidationChain[] = [
  // Validación para asegurar que "ProductosVendidos" sea un array válido y no esté vacío
  check("ProductosVendidos")
    .isArray()
    .withMessage("Los productos vendidos deben ser un array válido")
    .custom((productos) => {
      if (!Array.isArray(productos) || productos.length === 0) {
        throw new Error(
          "Los productos vendidos deben ser un array válido y no estar vacíos"
        );
      }

      // Validación individual de cada producto en "ProductosVendidos"
      productos.forEach((producto, index) => {
        // Verifica que cada elemento en "ProductosVendidos" sea un objeto
        if (typeof producto !== "object") {
          throw new Error(
            `El producto en la posición ${index} no es un objeto válido`
          );
        }

        // Verifica que cada producto tenga una propiedad 'Nombre'
        if (!producto.hasOwnProperty("Nombre")) {
          throw new Error(
            `El producto en la posición ${index} debe tener una propiedad 'Nombre'`
          );
        }

        // Verifica que el precio de cada producto sea un número válido
        if (
          !producto.hasOwnProperty("Precio") ||
          isNaN(Number(producto.Precio))
        ) {
          throw new Error(
            `El producto en la posición ${index} debe tener un precio numérico`
          );
        }

        // Verifica que la cantidad de cada producto sea un número válido
        if (
          !producto.hasOwnProperty("Cantidad") ||
          isNaN(Number(producto.Cantidad))
        ) {
          throw new Error(
            `El producto en la posición ${index} debe tener una cantidad numérica`
          );
        }

        // Verifica que el subtotal de cada producto sea un número válido
        if (
          !producto.hasOwnProperty("Subtotal") ||
          isNaN(Number(producto.Subtotal))
        ) {
          throw new Error(
            `El producto en la posición ${index} debe tener un subtotal numérico`
          );
        }
      });

      return true; // Indica que las validaciones han sido completadas con éxito
    }),

  // Validación para asegurar que "TotalVenta" sea un número válido
  check("TotalVenta")
    .isNumeric()
    .withMessage("El total de la venta debe ser un número válido"),

  // Validación para asegurar que "TotalProductosVendidos" sea un número válido
  check("TotalProductosVendidos")
    .isNumeric()
    .withMessage("El total de productos vendidos debe ser un número válido"),

  // Validación para asegurar que "FechaVenta" tenga el formato "YYYY-MM-DD"
  check("FechaVenta")
    .matches(/^\d{4}-\d{2}-\d{2} $/)
    .withMessage(
      'La fecha de la venta debe tener el formato "YYYY-MM-DD"'
    ),
];

/**
 * Validador para la obtención de información de un documento en la colección "historial_venta".
 * Valida el nombre del documento para asegurarse de que sea una cadena de texto no vacía.
 * Si el nombre del documento no es válido, se generará un mensaje de error correspondiente.
 */
export const obtenerInfoDocumentoValidator: ValidationChain[] = [
  // Comprueba que el campo "nombreDocumento" no esté vacío
  check("nombreDocumento")
    .notEmpty()
    .withMessage("El nombre del documento es requerido")
    // Comprueba que el campo "nombreDocumento" sea una cadena de texto
    .isString()
    .withMessage("El nombre del documento debe ser una cadena de texto"),
];
