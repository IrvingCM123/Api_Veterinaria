// Importa los módulos y middleware necesarios
import express from 'express';
import productoRoutes from './router/routes'; 
import cors from 'cors'; 
import { errorHandler } from './middleware/errorHandler';
import { createProxyMiddleware } from 'http-proxy-middleware';
import morgan from "morgan";

// Crea una instancia de la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Configura middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());
app.use(morgan("dev"));
app.options('*', cors())
app.use(express.urlencoded({ extended: true })); 

const corsOptions = {
  origin: '*', // Esto permite que cualquier origen acceda a tu API (deberías limitarlo a orígenes específicos en producción)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

  // Aplica el middleware CORS con las opciones configuradas
  app.use(cors(corsOptions));
  
// Aplica las rutas de tu aplicación definidas en productoRoutes
app.use(productoRoutes);

app.get('/hola', (req, res, next) => {
	res.send('node express api <br> by adsoft');
});

// Inicia el servidor y escucha en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
