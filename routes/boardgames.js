const express = require('express');
const router = express.Router();
const { boardgameValidationRules, validate } = require('../middleware/validate');
const { handleErrors } = require('../middleware/error-handling');
const boardgamesController = require('../controllers/boardgames');

router.get('/', boardgamesController.getAll);

router.get('/:id', boardgamesController.getSingle);

router.post(
    '/',
    boardgameValidationRules(),
    validate,
    boardgamesController.createBoardgame);

router.put(
    '/:id',
    boardgameValidationRules(),
    validate,
    boardgamesController.updateBoardgame);

router.delete('/:id', boardgamesController.deleteBoardgame);

router.use(handleErrors);

module.exports = router;
