const express = require('express');
const router = express.Router();
const { playerValidationRules, validate } = require('../middleware/validate');
const { handleErrors } = require('../middleware/error-handling');
const playersController = require('../controllers/players');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', playersController.getAll);

router.get('/:id', playersController.getSingle);

router.post(
    '/',
    isAuthenticated,
    playerValidationRules(),
    validate,
    playersController.createPlayer
);

router.put(
    '/:id',
    isAuthenticated,
    playerValidationRules(),
    validate,
    playersController.updatePlayer
);

router.delete(
    '/:id',
    isAuthenticated,
     playersController.deletePlayer
);

router.use(handleErrors);

module.exports = router;
