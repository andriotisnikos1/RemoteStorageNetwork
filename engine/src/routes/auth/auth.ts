import express from 'express';
import ping from './ping.js';
import login from './login.js';

const auth = express.Router();

auth.use(express.json());

auth.get("/ping", ping)
auth.get("/login", login)

export default auth;