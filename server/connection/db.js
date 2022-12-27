import mongoose from "mongoose"
import { MONGODB } from "../config/config.js";


mongoose.set('strictQuery', true);

export async function connectDB() {
    try {
        const db = await mongoose.connect(MONGODB) 
        console.log('Connected to ', db.connect.name)
    } catch (error) {   
        console.log(error)
    }
    
}