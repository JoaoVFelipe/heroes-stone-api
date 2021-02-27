import config from 'config';
import ValidateExceptions from '../exceptions/validate';
import authMiddleware from '../middlewares/auth';

module.exports = (app) => {
    const controller = app.controllers.user;
    const validation = app.validations.user;

    const baseURL = `${config.get('base_url')}/user`;

    const baseValidateAndControllerCall = async (name, req, res) => {
        const errors = await validation[name](req, res);
        if (errors.length === 0) {
            controller[name](req, res);
        } else {
            res.status(400).send(new ValidateExceptions(400, 'An error ocurred!', errors));
        }
    };

    // Get profile data
    app.get(baseURL, authMiddleware, (req, res) => {
        baseValidateAndControllerCall('getProfile', req, res);
    });
};
