// Configuracion de Express
import express from 'express';
import fileUpload from 'express-fileupload';
import productsRoutes from './routes/products.routes.js';
import path, { join } from 'path'; // Importar 'join' desde 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middlewares
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './upload',
  })
);

// Routes
app.use(productsRoutes);

// Servir archivos estáticos del frontend
app.use(express.static(join(__dirname, '../frontend/build')));

// Manejar rutas desconocidas para aplicaciones SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../frontend/build/index.html')); // Ruta corregida
});

export default app;


