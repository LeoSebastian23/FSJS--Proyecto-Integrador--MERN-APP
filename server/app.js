// Configuracion de Express
import express from 'express'
import fileUpload from 'express-fileupload'
import productsRoutes from './routes/products.routes.js'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  fileUpload({
    tempFileDir: "./upload",
    useTempFiles: true,
  })
);

app.use(express.static(path.join(__dirname, '../client01/build')));

// Routes
app.use("/api", productsRoutes); 

export { app };
