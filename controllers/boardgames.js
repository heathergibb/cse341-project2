const mongodb = require('../data/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Boardgames']
    const collection = await mongodb.getCollection('boardgames');

    if (!collection) {
        // if collection does not exist
        return res.status(404).json({
            error: 'Some error occurred connecting to the collection.'
        });
    }

    const result = await collection.find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Boardgames']
    if (!ObjectId.isValid(req.params.id)) {
        // check if valid id format
        res.status(400).json('Must use a valid id to find boardgame.');
    }

    const boardgameId = new ObjectId(req.params.id);
    const collection = await mongodb.getCollection('boardgames');

    if (!collection) {
        // if collection does not exist
        return res.status(404).json({
            error: 'Some error occurred connecting to the collection.'
        });
    }

    const result = await collection.find({ _id: boardgameId }).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
};

const createBoardgame = async (req, res) => {
    //#swagger.tags=['Boardgames']
    const collection = await mongodb.getCollection('boardgames');

    if (!collection) {
        // if collection does not exist
        return res.status(404).json({
            error: 'Some error occurred connecting to the collection.'
        });
    }

    const newBoardgame = {
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        numPlayers: req.body.numPlayers,
        ages: req.body.ages,
        playingTime: req.body.playingTime,
        yearCreated: req.body.yearCreated,
        complexityRating: req.body.complexityRating
    };

    const response = await collection.insertOne(newBoardgame);

    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status().json(
            response.error ||
                'Some error occurred while creating the boardgame.'
        );
    }
};

const updateBoardgame = async (req, res) => {
    //#swagger.tags=['Boardgames']
    if (!ObjectId.isValid(req.params.id)) {
        // check if valid id format
        res.status(400).json('Must use a valid id to find boardgame.');
    }

    const boardgameId = new ObjectId(req.params.id);
    const collection = await mongodb.getCollection('boardgames');

    if (!collection) {
        // if collection does not exist
        return res.status(404).json({
            error: 'Some error occurred connecting to the collection.'
        });
    }

    const boardgame = {
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        numPlayers: req.body.numPlayers,
        ages: req.body.ages,
        playingTime: req.body.playingTime,
        yearCreated: req.body.yearCreated,
        complexityRating: req.body.complexityRating
    };

    const response = await collection.replaceOne(
        { _id: boardgameId },
        boardgame
    );

    if (response.modifiedCount > 0) {
        res.status(204).json(response);
    } else {
        res.status(500).json(
            response.error ||
                'Some error occurred while updating the boardgame.'
        );
    }
};

const deleteBoardgame = async (req, res) => {
    //#swagger.tags=['Boardgames']
    if (!ObjectId.isValid(req.params.id)) {
        // check if valid id format
        return res.status(400).json('Must use a valid id to find boardgame.');
    }

    const boardgameId = new ObjectId(req.params.id);
    const collection = await mongodb.getCollection('boardgames');

    if (!collection) {
        // if collection does not exist
        return res.status(404).json({
            error: 'Some error occurred connecting to the collection.'
        });
    }

    const response = await collection.deleteOne({ _id: boardgameId }, true);

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(
            response.error ||
                'Some error occurred while deleting the boardgame.'
        );
    }
};

module.exports = {
    getAll,
    getSingle,
    createBoardgame,
    updateBoardgame,
    deleteBoardgame
};
