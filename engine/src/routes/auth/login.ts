import express from 'express';


export default function (req:express.Request, res:express.Response) {
  try {
    const auth = req.headers.authorization;
    res.send({
        token: "test",
    })  
  } catch (error) {
    console.log(JSON.stringify({
      type: "error",
      message: "Error parsing config.json",
    }));
    res.sendStatus(500);
  }
}