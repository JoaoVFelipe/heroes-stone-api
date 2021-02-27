import config from 'config';
import ValidateExceptions from '../exceptions/validate';
import authMiddleware from '../middlewares/auth';

module.exports = (app) => {
    const controller = app.controllers.comic;
    const validation = app.validations.comic;

    const baseURL = `${config.get('base_url')}/comics`;

    const baseValidateAndControllerCall = async (name, req, res) => {
        const errors = await validation[name](req, res);
        if (errors.length === 0) {
            controller[name](req, res);
        } else {
            res.status(400).send(new ValidateExceptions(400, 'An error ocurred!', errors));
        }
    };

    // List all favorite comics from a user
    app.get(baseURL, authMiddleware, (req, res) => {
        baseValidateAndControllerCall('listAllFavoriteComics', req, res);
    });

    // Favorite one comic
    app.post(`${baseURL}/:comicId`, authMiddleware, async (req, res) => {
        baseValidateAndControllerCall('favoriteComic', req, res);
    });

    // Unfavorite one comic
    app.delete(`${baseURL}/:comicId`, authMiddleware, async (req, res) => {
        baseValidateAndControllerCall('unfavoriteComic', req, res);
    });
};
