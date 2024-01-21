import express from 'express'
import upload from './upload/upload.js';
import auth from './auth/auth.js';

const root = express.Router();

root.use("/upload", upload)
root.use("/auth", auth)

export default root;