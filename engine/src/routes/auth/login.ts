import express from 'express';
import { config, mongodb } from '../../central.config';
import crypto from 'crypto';
import fsp from 'fs/promises';


export default async function (req:express.Request, res:express.Response) {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      res.sendStatus(401);
      return;
    }
    const creds = Buffer.from(auth.split(" ")[1], "base64").toString("utf-8").split(":");
    const requiredUsername = config.auth ? config.auth.username : "admin";
    const requiredPassword = config.auth ? config.auth.password : "admin";
    const username = (creds[0] === requiredUsername);
    const password = (creds[1] === requiredPassword);
    if (!username || !password) {
      res.sendStatus(401);
      return;
    }
    const token = crypto.randomBytes(32).toString("hex");
    res.send({
      token,
    });
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    await mongodb.collection("tokens").insertOne({token: tokenHash})
  } catch (error) {
    console.log(JSON.stringify({
      type: "error",
      message: "Error parsing config.json",
    }));
    res.sendStatus(500);
  }
}