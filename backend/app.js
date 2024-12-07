// Configuracion de Express
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import productsRoutes from './routes/products.routes.js';
import path, { join } from 'path'; // Importar 'join' desde 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Cors
app.use(cors({
  origin: 'https://fsjs-mern-app-auy0.onrender.com',  // Reemplaza con la URL de tu frontend en producción
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Middlewares
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './upload',
  })
);

app.get('/', (req, res) => {
    res.send('Bienvenido a la API de FSJS')
  })
// Routes
app.use(productsRoutes);


// app.use(express.static(path.join(__dirname, '../frontend/build')));

// app.get('*', (req, res) => {
//     res.sendFile(join(__dirname, '../frontend/build/index.html'));
// });


export default app;


