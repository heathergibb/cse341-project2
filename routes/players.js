const express = require('express');
const router = express.Router();
const { playerValidationRules, validate } = require('../middleware/validate');
const { handleErrors } = require('../middleware/error-handling');
const playersController = require('../controllers/players');

router.get('/', playersController.getAll);

router.get('/:id', playersController.getSingle);

router.post(
    '/',
    playerValidationRules(),
    validate,
    playersController.createPlayer
);

router.put(
    '/:id',
    playerValidationRules(),
    validate,
    playersController.updatePlayer
);

router.delete('/:id', playersController.deletePlayer);

router.use(handleErrors);

module.exports = router;
