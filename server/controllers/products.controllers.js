import {
    uploadImage,
    deleteImage
} from "../library/cloudinary.js";
import Product from "../models/Products.js";
import fs from 'fs-extra' // modulo utiliza promesas


// OBTIENE LOS PRODUCTOS
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// CREA PRODUCTO
export const createProducts = async (req, res) => {
    try {
        const {
            titulo,
            categoria,
            precio,
            stock,
            descripcion,
        } = req.body;

        let imagen = null;

        if (req.files?.imagen) {
            const result = await uploadImage(
                req.files.imagen.tempFilePath // solo necesito tempFilePath del objeto
            )
            imagen = { // Se guardan los datos que necesito dentro de esta variable
                url: result.secure_url,
                public_id: result.public_id
            }
            await fs.remove(req.files.imagen.tempFilePath) // elimina archivo, una vez subido a cloudinary
        }

        const newProduct = new Product({
            titulo,
            categoria,
            imagen, // se guarda la url dentro de la coleccion mientras el archivo se sube a cloudinary
            precio,
            stock,
            descripcion,
        });

        await newProduct.save();
        return res.json(newProduct);
        
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// ACTUALIZA PRODUCTO
export const updateProducts = async (req, res) => {
    try {
        const producto = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }); //devuelve objeto actualizado
        console.log(producto);
        return res.send(producto);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// ELIMINA PRODUCTO
export const deleteProducts = async (req, res) => {
    try {
        const productRemove = await Product.findByIdAndDelete(req.params.id);

        if (!productRemove) return res.sendStatus(404);

        if (productRemove.imagen.public_id) { //si tiene imagen y public_id se elimina la imagen de cloudinary
            await deleteImage(productRemove.imagen.public_id)
        }
        return res.sendStatus(204);

    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

// OBTIENE UN PRODUCTO
export const getOneProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) return res.sendStatus(404);
        return res.json(product);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};