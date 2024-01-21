import mongodb from 'mongodb';

export default async function connectMongoDB() {
    try {
        //todo: add env variable for mongodb url
        const url = process.env.MONGODB_URL || `mongodb://localhost:27018`;
        const client = await mongodb.MongoClient.connect(url);
        const db = client.db("rns");
        return db;
    } catch (error) {
        console.log(JSON.stringify({
            type: "error",
            message: "Error connecting to mongodb",
        }))
        process.exit(1);
    }
}