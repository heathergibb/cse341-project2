const { body, validationResult } = require('express-validator');

const boardgameValidationRules = () => {
    return [
        body('name')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('Name is required.'),
        body('description')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('Description is required.'),
        body('brand')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('Brand is required.'),
        body('numPlayers')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('Number of players is required.'),
        body('yearCreated')
            .optional()
            .trim()
            .isNumeric()
            .withMessage('Year must be numeric.')
            .bail()
            .custom((value) => {
                const year = parseInt(value, 10);
                const curYear = new Date().getFullYear();

                if (year < 1900 || year > curYear) {
                    throw new Error(`Year must be between 1900 and ${curYear}`);
                }
                return true;
            }),
        body('complexityRating')
            .optional()
            .trim()
            .isNumeric()
            .withMessage('Complexity rating must be a valid number.')
            .bail()
            .isFloat({ min: 0, max: 5 })
            .withMessage('Complexity Rating must be a number between 0 and 5')
    ];
};

const playerValidationRules = () => {
    return [
        body('firstName')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('First Name is required.'),
        body('lastName')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('Last Name is required.')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors
    });
};

module.exports = {
    boardgameValidationRules,
    playerValidationRules,
    validate
};
