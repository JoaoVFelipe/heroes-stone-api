import config from 'config';
import ValidateExceptions from '../exceptions/validate';


module.exports = (app) => {
  const controller = app.controllers.login;
  const validation = app.validations.login;

  const baseURL = `${config.get('base_url')}`;

  const baseValidateAndControllerCall = async (name, req, res) => {
    const errors = await validation[name](req, res);
    if (errors.length === 0) {
      controller[name](req, res);
    } else {
      res.status(400).send(new ValidateExceptions(400, 'An error ocurred!', errors));
    }
  };

  // Realize login
  app.post(`${baseURL}/login`, (req, res) => {
    baseValidateAndControllerCall('login', req, res);
  });
};
