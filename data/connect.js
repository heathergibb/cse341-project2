// const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
const dbConfig = require('../config/dbConfig');

let _db;

const connectToDB = (callback) => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }
    MongoClient.connect(dbConfig.url)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getCollection = async (collectionName) => {
    if (!_db) {
        throw Error('Db not initialized');
    }

    try {
        const db = _db.db();
        const collections = await db.listCollections().toArray(); // Fetch all the connections in the db
        const collectionExists = collections.some(
            (col) => col.name === collectionName
        ); // Check if collectionName exists

        if (!collectionExists) {
            console.error(`Collection '${collectionName}' does not exist.`);
            return null;
        }

        return db.collection(collectionName); // Return the collection instance
    } catch (error) {
        console.error(
            `An error occurred while fetching collection '${collectionName}':`,
            error
        );
        return null;
    }
};

module.exports = {
    connectToDB,
    getCollection
};
