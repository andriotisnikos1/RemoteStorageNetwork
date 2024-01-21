import { Config } from "../../types/config.js";
import fsp from "fs/promises";
import { join } from "path";
import { basePath } from "../../index.js";

export default async function getConfig(): Promise<Config.Config> {
    try {
        const config = await fsp.readFile(join(basePath, 'config.json'), 'utf-8')
        return JSON.parse(config) as Config.Config;
    } catch (error) {
        throw new Error("Failed to read config file!!");
    }
}