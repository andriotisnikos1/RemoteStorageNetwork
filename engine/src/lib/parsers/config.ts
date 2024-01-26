import fsp from 'fs/promises';
import { Config } from '../../types/config.js';
import crypto from 'crypto';

export async function parseConfigFile() {
    try {
        const config = await fsp.readFile('./config.json', 'utf-8');
        const parsedConfig = JSON.parse(config) as Config;

        if (!parsedConfig.mongodb.url && !parsedConfig.mongodb.credentials) console.log("No mongodb url or valid credentials provided in config.json");
        if (!parsedConfig.port) console.log(JSON.stringify({type: "warning", message: "No port provided in config.json, using default port 1787"}));
        if (parsedConfig.disableAuthentication) console.log(JSON.stringify({type: "warning", message: "Authentication is disabled in config.json. You can no longer login to this RSN server"}));
        if (!parsedConfig.auth) {
            console.log(JSON.stringify({type: "warning", message: "No auth provided in config.json, generating random auth credentials"}));
            const username = crypto.randomBytes(16).toString("hex");
            const password = crypto.randomBytes(16).toString("hex");
            console.log("---Credentials---");
            console.log(`Username: ${username}`);
            console.log(`Password: ${password}`);
            console.log("-----------------");
            const auth = JSON.stringify({username, password});
            const hash = crypto.createHash('sha256').update(auth).digest('hex');
            await fsp.writeFile('./passwd', hash);
        } else {
            await fsp.writeFile('./passwd', crypto.createHash('sha256').update(JSON.stringify(parsedConfig.auth)).digest('hex'));
        }

        return parsedConfig
    } catch (error) {
        console.log(JSON.stringify({
            type: "error",
            message: "Error parsing config.json",
        }));
        process.exit(1);
    }
}