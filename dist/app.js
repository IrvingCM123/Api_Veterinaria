"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./router/routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/api', routes_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});
