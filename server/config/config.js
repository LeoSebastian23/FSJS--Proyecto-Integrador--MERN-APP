import dotenv from 'dotenv'

dotenv.config()

export const MONGODB = process.env.MONGODB_AFA || 'mongodb://localhost/testdb'

export const PORT = process.env.PORT || 4000

export const CLOUD_NAME = process.env.CLOUD_NAME

export const API_KEY = process.env.API_KEY

export const API_SECRET = process.env.API_SECRET