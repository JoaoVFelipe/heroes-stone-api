import express from 'express';
import bodyParser from 'body-parser';
import config from 'config';
import consign from 'consign';
import cors from 'cors';

module.exports = () => {
  const app = express();

  // Set basic variables
  app.set('port', process.env.PORT || config.get('server.port'));

  // Config middlewares
  app.use(bodyParser.json());

  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    exposedHeaders: 'X-Authorization',
  }));

  consign({ cwd: 'api' })
    .then('models')
    .then('controllers')
    .then('validations')
    .then('resources')
    .into(app);

  return app;
};
