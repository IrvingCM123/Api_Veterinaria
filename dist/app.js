"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const Animales_Routes_1 = __importDefault(require("./router/Animales.Routes"));
const Categorias_Routes_1 = __importDefault(require("./router/Categorias.Routes"));
const DetalleVenta_Routes_1 = __importDefault(require("./router/DetalleVenta.Routes"));
const Inventario_Routes_1 = __importDefault(require("./router/Inventario.Routes"));
const InventarioGranel_Routes_1 = __importDefault(require("./router/InventarioGranel.Routes"));
const Marcas_Routes_1 = __importDefault(require("./router/Marcas.Routes"));
const Productos_Routes_1 = __importDefault(require("./router/Productos.Routes"));
const Proveedores_Routes_1 = __importDefault(require("./router/Proveedores.Routes"));
const Sucursales_Routes_1 = __importDefault(require("./router/Sucursales.Routes"));
const TipoProducto_Routes_1 = __importDefault(require("./router/TipoProducto.Routes"));
const Usuarios_Routes_1 = __importDefault(require("./router/Usuarios.Routes"));
const Vendedor_Routes_1 = __importDefault(require("./router/Vendedor.Routes"));
const Venta_Routes_1 = __importDefault(require("./router/Venta.Routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
app.use((0, cors_1.default)(corsOptions));
app.use("/api/animales", Animales_Routes_1.default);
app.use("/api/categorias", Categorias_Routes_1.default);
app.use("/api/detalleVenta", DetalleVenta_Routes_1.default);
app.use("/api/inventario", Inventario_Routes_1.default);
app.use("/api/inventarioGranel", InventarioGranel_Routes_1.default);
app.use("/api/marcas", Marcas_Routes_1.default);
app.use("/api/productos", Productos_Routes_1.default);
app.use("/api/proveedores", Proveedores_Routes_1.default);
app.use("/api/sucursal", Sucursales_Routes_1.default);
app.use("/api/tipoProducto", TipoProducto_Routes_1.default);
app.use("/api/usuarios", Usuarios_Routes_1.default);
app.use("/api/vendedor", Vendedor_Routes_1.default);
app.use("/api/venta", Venta_Routes_1.default);
// Ruta para manejar errores 404 (debe ser al final de todas las rutas)
app.use((req, res, next) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});
// Inicia el servidor y escucha en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});
