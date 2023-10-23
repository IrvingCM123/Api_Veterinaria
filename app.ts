// Importa los módulos y middleware necesarios
import express from "express";
import cors from "cors";
import morgan from "morgan";

// Importa las rutas de la aplicación

import AnimalesRoutes from "./router/Animales.Routes";
import CategoriasRoutes from "./router/Categorias.Routes";
import DetalleVentaRoutes from "./router/DetalleVenta.Routes";
import InventarioRoutes from "./router/Inventario.Routes";
import InventarioGranelRoutes from "./router/InventarioGranel.Routes";
import MarcasRoutes from "./router/Marcas.Routes";
import ProductosRoutes from "./router/Productos.Routes";
import ProveedoresRoutes from "./router/Proveedores.Routes";
import SucursalRoutes from "./router/Sucursales.Routes";
import TipoProductoRoutes from "./router/TipoProducto.Routes";
import UsuariosRoutes from "./router/Usuarios.Routes";
import VendedorRoutes from "./router/Vendedor.Routes";
import VentaRoutes from "./router/Venta.Routes";

// Crea una instancia de la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Configura middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*", // Esto permite que cualquier origen acceda a tu API (deberías limitarlo a orígenes específicos en producción)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Aplica el middleware CORS con las opciones configuradas
app.use(cors(corsOptions));

// Aplica las rutas de tu aplicación definidas en productoRoutes
app.use("/api/animales", AnimalesRoutes);
app.use("/api/categorias", CategoriasRoutes);
app.use("/api/detalleVenta", DetalleVentaRoutes);
app.use("/api/inventario", InventarioRoutes);
app.use("/api/inventarioGranel", InventarioGranelRoutes);
app.use("/api/marcas", MarcasRoutes);
app.use("/api/productos", ProductosRoutes);
app.use("/api/proveedores", ProveedoresRoutes);
app.use("/api/sucursal", SucursalRoutes);
app.use("/api/tipoProducto", TipoProductoRoutes);
app.use("/api/usuarios", UsuariosRoutes);
app.use("/api/vendedor", VendedorRoutes);
app.use("/api/venta", VentaRoutes);

// Ruta para manejar errores 404 (debe ser al final de todas las rutas)
app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});


// Inicia el servidor y escucha en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
