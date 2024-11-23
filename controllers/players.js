const mongodb = require('../data/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Players']
    const collection = await mongodb.getCollection('players');

    if (!collection) {
        // if collection does not exist
        return res
            .status(404)
            .json({
                error: 'Some error occurred connecting to the collection.'
            });
    }

    const result = await collection.find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Players']
    if (!ObjectId.isValid(req.params.id)) {
        // check if valid id format
        res.status(400).json('Must use a valid id to find player.');
    }

    const playerId = new ObjectId(req.params.id);
    const collection = await mongodb.getCollection('players');

    if (!collection) {
        // if collection does not exist
        return res
            .status(404)
            .json({
                error: 'Some error occurred connecting to the collection.'
            });
    }

    const result = await collection.find({ _id: playerId }).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
};

const createPlayer = async (req, res) => {
    //#swagger.tags=['Players']
    const collection = await mongodb.getCollection('players');

    if (!collection) {
        // if collection does not exist
        return res
            .status(404)
            .json({
                error: 'Some error occurred connecting to the collection.'
            });
    }

    const newPlayer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    const response = await collection.insertOne(newPlayer);

    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(
            response.error || 'Some error occurred while creating the player.'
        );
    }
};

const updatePlayer = async (req, res) => {
    //#swagger.tags=['Players']
    if (!ObjectId.isValid(req.params.id)) {
        // check if valid id format
        res.status(400).json('Must use a valid id to find player.');
    }

    const playerId = new ObjectId(req.params.id);
    const collection = await mongodb.getCollection('players');

    if (!collection) {
        // if collection does not exist
        return res
            .status(404)
            .json({
                error: 'Some error occurred connecting to the collection.'
            });
    }

    const player = {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    const response = await collection.replaceOne({ _id: playerId }, player);

    if (response.modifiedCount > 0) {
        res.status(204).json(response);
    } else {
        res.status(500).json(
            response.error || 'Some error occurred while updating the player.'
        );
    }
};

const deletePlayer = async (req, res) => {
    //#swagger.tags=['Players']
    if (!ObjectId.isValid(req.params.id)) {
        // check if valid id format
        return res.status(400).json('Must use a valid id to find player.');
    }

    const playerId = new ObjectId(req.params.id);
    const collection = await mongodb.getCollection('players');

    if (!collection) {
        // if collection does not exist
        return res
            .status(404)
            .json({
                error: 'Some error occurred connecting to the collection.'
            });
    }

    const response = await collection.deleteOne({ _id: playerId }, true);

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(
            response.error || 'Some error occurred while deleting the player.'
        );
    }
};

module.exports = {
    getAll,
    getSingle,
    createPlayer,
    updatePlayer,
    deletePlayer
};
