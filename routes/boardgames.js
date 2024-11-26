const express = require('express');
const router = express.Router();
const {
    boardgameValidationRules,
    validate
} = require('../middleware/validate');
const { handleErrors } = require('../middleware/error-handling');
const boardgamesController = require('../controllers/boardgames');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', boardgamesController.getAll);

router.get('/:id', boardgamesController.getSingle);

router.post(
    '/',
    isAuthenticated,
    boardgameValidationRules(),
    validate,
    boardgamesController.createBoardgame
);

router.put(
    '/:id',
    isAuthenticated,
    boardgameValidationRules(),
    validate,
    boardgamesController.updateBoardgame
);

router.delete('/:id', isAuthenticated, boardgamesController.deleteBoardgame);

router.use(handleErrors);

module.exports = router;
