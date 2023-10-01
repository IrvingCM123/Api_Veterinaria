// Importa los módulos y middleware necesarios
import express from 'express';
import productoRoutes from './router/routes'; 
import cors from 'cors'; 
import { errorHandler } from './middleware/errorHandler';
import { createProxyMiddleware } from 'http-proxy-middleware';

// Crea una instancia de la aplicación Express
const app = express();
const port = process.env.PORT || 3000;

// Configura middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

app.options('*', cors());

app.use(cors({
  origin: 'https://practicas-veterinaria-j4pmzhsb3-irvingconde.vercel.app',
  credentials: true,
}));   
   
const corsOptions = {
  origin: 'https://practicas-veterinaria-j4pmzhsb3-irvingconde.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
  credentials: true, // Habilita las credenciales, si es necesario (por ejemplo, cookies)
  };
  
  // Aplica el middleware CORS con las opciones configuradas
  app.use(cors(corsOptions));
  
// Aplica las rutas de tu aplicación definidas en productoRoutes
app.use('/api', productoRoutes);

// Aplica el middleware de manejo de errores
app.use(errorHandler);

// Inicia el servidor y escucha en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
