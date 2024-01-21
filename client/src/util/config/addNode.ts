import getConfig from "./getConfig.js";
import updateConfig from "./updateConfig.js";

export default async function addNode(alias: string, host: string, token: string) {
    try {
        const config = await getConfig();
        config.nodes.push({
            alias,
            host,
            token
        });
        await updateConfig(config);
        return true
    } catch (error) {
        console.log(JSON.stringify({
            type: 'error',
            message: error
        }));
        return false
    }
}