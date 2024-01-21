import express from 'express'
import upload from './upload/upload.js';

const root = express.Router();

root.post("/upload", upload)

export default root;