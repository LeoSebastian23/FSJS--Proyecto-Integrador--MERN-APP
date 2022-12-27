import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
     
    titulo:{
        type: String,
        required: true,
        trim: true
    },
    categoria:{
        type: String,
        required: true
    },
    imagen:{
        url: String,
        public_id : String
    }, 
    descripcion:{
        type: String,
        trim: true
    },
    precio:{
        type: Number,
        required: true
    }, 
    stock:{
        type: Number,
        required: true
    }
})

export default mongoose.model('Product',productSchema)