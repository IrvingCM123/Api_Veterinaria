import express from 'express';
import productoRoutes from './router/routes'; 
import { errorHandler } from './middleware/errorHandler';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', productoRoutes); 

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
