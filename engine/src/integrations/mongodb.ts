import mongodb from 'mongodb';

export default async function connectMongoDB() {
    try {
        //todo: add env variable for mongodb url
        const url = process.env.MONGODB_URL || `mongodb://localhost:27018`;
        const client = await mongodb.MongoClient.connect(url);
        const db = client.db("rns");
        return db;
    } catch (error) {
        const err = error as mongodb.MongoError;
        console.log(JSON.stringify({
            message: err.message,
            code: err.code,
            name: err.name,
            stack: err.stack
        }))
    }
}