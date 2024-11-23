const { handleErrors } = require('../middleware/error-handling');

const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/boardgames', require('./boardgames'));
router.use('/players', require('./players'));

router.get(
    '/',
    handleErrors((req, res) => {
        //#swagger.tags=['Welcome']
        res.send('Welcome to the Boardgame API');
    })
);

module.exports = router;
