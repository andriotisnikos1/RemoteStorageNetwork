import fsp from 'fs/promises';
import { platform } from 'process';
import { join } from 'path';
import { homedir } from 'os';
export default async function validateConfig() {
    try {
        let configPath;
        switch (platform) {
            case 'win32':
                configPath = join(homedir(), 'AppData', 'Roaming', 'rns', 'config.json');
                break;
            case 'linux':
                configPath = join(homedir(), '.config', 'rns', 'config.json');
                break;
            case 'darwin':
                configPath = join(homedir(), 'Library', 'Application Support', 'rns', 'config.json');
                break;
            default:
                throw new Error('Unsupported platform');
        }
        await fsp.access(configPath).catch(async () => {
            await fsp.mkdir(configPath.split('/').slice(0, -1).join('/'), { recursive: true });
            await fsp.writeFile(configPath, "{}");
        });
        const workdir = configPath.split('/').slice(0, -1).join('/');
        return workdir;
    }
    catch (error) {
        process.exit(1);
    }
}
