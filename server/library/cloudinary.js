import cloudinary from 'cloudinary'
import { API_KEY, API_SECRET, CLOUD_NAME } from '../config/config.js'


cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key:API_KEY,
    api_secret:API_SECRET
})

export const uploadImage = async filePath => {
    return await cloudinary.v2.uploader.upload(filePath, {
        folder: 'afa' // carpeta que contiene el archivo
    })
}

export const deleteImage = async id => {
    return cloudinary.uploader.destroy(id)
}