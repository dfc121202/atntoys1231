const { MongoClient, ObjectId } = require('mongodb')

const DATABASE_URL = "mongodb+srv://hieu:Hieu123@cluster0.ychuq.mongodb.net/test";
const DATABASE_NAME = "atnshop";

async function getDatabase() {
    const client = await MongoClient.connect(DATABASE_URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}


async function updateDocument(id, updateValues, collectionName) {
    const dbo = await getDatabase();
    await dbo.collection(collectionName).updateOne({ _id: ObjectId(id) }, updateValues)
    console.log("Object updated: " + id);
}

async function getDocumentById(id, collectionName) {
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).findOne({ _id: ObjectId(id) })
    return result;
}

async function insertToDB(obj, collectionName) {
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).insertOne(obj)
    console.log("Inserted ID: ", result.insertedId.toHexString());
}

async function getAll(collectionName) {
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).find({}).toArray()
    return result
}

async function deleteObject(id, collectionName) {
    const dbo = await getDatabase()
    await dbo.collection(collectionName).deleteOne({ _id: ObjectId(id) })
    console.log("Object deleted: " + id);
}

module.exports = { insertToDB, getAll, deleteObject, getDocumentById, updateDocument }