import { check, ValidationChain } from 'express-validator';

// Definición de las validaciones para un producto individual dentro de la venta
const productoValidator: ValidationChain[] = [
  // Verifica que el campo 'Nombre' no esté vacío y agrega un mensaje de error personalizado si lo está.
  check('Nombre').notEmpty().withMessage('El nombre del producto es requerido'),

  // Verifica que el campo 'Precio' sea un número y agrega un mensaje de error personalizado si no lo es.
  check('Precio').isNumeric().withMessage('El precio del producto debe ser un número válido'),

  // Verifica que el campo 'Cantidad' sea un número y agrega un mensaje de error personalizado si no lo es.
  check('Cantidad').isNumeric().withMessage('La cantidad del producto debe ser un número válido'),

  // Verifica que el campo 'Subtotal' sea un número y agrega un mensaje de error personalizado si no lo es.
  check('Subtotal').isNumeric().withMessage('El subtotal del producto debe ser un número válido'),
];

// Definición de las validaciones para la estructura general de la venta
export const validarVenta: ValidationChain[] = [
  // Verifica que el campo 'FechaVenta' coincida con el formato "YYYY-MM-DD HH:mm:ss" y agrega un mensaje de error personalizado si no coincide.
  check('FechaVenta').matches(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/).withMessage('La fecha de la venta debe tener el formato "YYYY-MM-DD HH:mm:ss"'),

  // Verifica que el campo 'TotalVenta' sea un número y agrega un mensaje de error personalizado si no lo es.
  check('TotalVenta').isNumeric().withMessage('El total de la venta debe ser un número válido'),

  // Verifica que el campo 'TotalProductosVendidos' sea un número y agrega un mensaje de error personalizado si no lo es.
  check('TotalProductosVendidos').isNumeric().withMessage('El total de productos vendidos debe ser un número válido'),

  // Verifica que el campo 'ProductosVendidos' sea un array y agrega un mensaje de error personalizado si no lo es.
  check('ProductosVendidos').isArray().withMessage('Los productos vendidos deben ser un array válido').custom((productos) => {
    if (!Array.isArray(productos)) {
      throw new Error('Los productos vendidos deben ser un array válido');
    }

    // Aplica las validaciones definidas en 'productoValidator' para cada producto individual en 'ProductosVendidos'
    productos.forEach((producto, index) => {
      productoValidator.forEach((validator: any) => {
        // Personaliza los mensajes de error para incluir la ubicación del error dentro de 'ProductosVendidos'
        validator.withMessage(`ProductosVendidos[${index}].${validator.fields[0]}: ${validator._message}`);
        validator.run(producto);
      });
    });

    return true; // Indica que las validaciones han sido completadas
  }),
];
