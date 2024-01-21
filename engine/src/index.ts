import "./central.config.js";
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from "./central.config.js";
import root from "./routes/root.js";

const app = express();

app.use(helmet());
app.use(cors({origin: "*"}));
app.use(express.urlencoded({extended: true}));

app.use("/", root)

app.listen(config.port || "1787" , () => {
    console.log("running")
})