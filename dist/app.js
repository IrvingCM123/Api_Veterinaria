"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa los módulos y middleware necesarios
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./router/routes"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// Crea una instancia de la aplicación Express
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Configura middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
};
// Aplica el middleware CORS con las opciones configuradas
app.use((0, cors_1.default)(corsOptions));
// Aplica las rutas de tu aplicación definidas en productoRoutes
app.use('/api', routes_1.default);
// Inicia el servidor y escucha en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});
