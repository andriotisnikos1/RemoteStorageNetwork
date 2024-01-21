import { config } from "../../central.config.js";
import express from 'express';

export default async function ping(req:express.Request, res:express.Response) {
    try {
        res.send({
            authAcceptable: !config.disableAuthentication,
        })
    } catch (error) {
        console.log(JSON.stringify({
            type: "error",
            message: "Error parsing config.json",
        }));
        res.sendStatus(500);
    }
}