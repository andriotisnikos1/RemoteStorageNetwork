import express from 'express'
import initialise from './initialise.js';

const router = express.Router();

router.use("/initialise", express.json());
router.post("/initialise", initialise)

router.use("/chunk", express.raw({type: "application/octet-stream", limit: "512kb"}));


export default router;