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


