import fsp from 'fs/promises';
import { Config } from '../../types/config.js';

export async function parseConfigFile() {
    try {
        const config = await fsp.readFile('./config.json', 'utf-8');
        const parsedConfig = JSON.parse(config) as Config;

        if (!parsedConfig.mongodb.url && !parsedConfig.mongodb.credentials) console.log("No mongodb url or valid credentials provided in config.json");
        if (!parsedConfig.port) console.log(JSON.stringify({type: "warning", message: "No port provided in config.json, using default port 1787"}));
        if (!parsedConfig.auth) console.log(JSON.stringify({type: "warning", message: "No auth provided in config.json, using default auth username: admin, password: admin"}));
        if (parsedConfig.disableAuthentication) console.log(JSON.stringify({type: "warning", message: "Authentication is disabled in config.json. You can no longer add more users."}));

        return parsedConfig
    } catch (error) {
        console.log(JSON.stringify({
            type: "error",
            message: "Error parsing config.json",
        }));
        process.exit(1);
    }
}