import config from 'config';
import ValidateExceptions from '../exceptions/validate';
import authMiddleware from '../middlewares/auth';

module.exports = (app) => {
    const controller = app.controllers.char;
    const validation = app.validations.char;

    const baseURL = `${config.get('base_url')}/chars`;

    const baseValidateAndControllerCall = async (name, req, res) => {
        const errors = await validation[name](req, res);
        if (errors.length === 0) {
            controller[name](req, res);
        } else {
            res.status(400).send(new ValidateExceptions(400, 'An error ocurred!', errors));
        }
    };

    // List all favorite chars from a user
    app.get(baseURL, authMiddleware, (req, res) => {
        baseValidateAndControllerCall('listAllFavoriteChars', req, res);
    });

    // Favorite one char
    app.post(`${baseURL}/:charId`, authMiddleware, async (req, res) => {
        baseValidateAndControllerCall('favoriteChars', req, res);
    });

    // Unfavorite one char
    app.delete(`${baseURL}/:charId`, authMiddleware, async (req, res) => {
        baseValidateAndControllerCall('unfavoriteChars', req, res);
    });
};
