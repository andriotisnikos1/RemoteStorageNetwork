import connectMongoDB from "./integrations/mongodb.js";
import { parseConfigFile } from "./lib/parsers/config.js";

export const config = await parseConfigFile();

export const mongodb = await connectMongoDB();

export const caches = {
    incoming: new Map(),
    receiving: new Map()
}