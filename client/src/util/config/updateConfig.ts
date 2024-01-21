import fsp from 'fs/promises';
import { basePath } from '../../index.js';
import { join } from 'path';
import { Config } from '../../types/config.js';

export default async function updateConfig(config: Config.Config) {
    try {
        await fsp.writeFile(join(basePath, 'config.json'), JSON.stringify(config));
    }
    catch (error) {
        throw new Error("Failed to write config file!!");
    }
}