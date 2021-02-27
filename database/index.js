/* eslint-disable no-unused-expressions */
import Sequelize from 'sequelize';
import FavoriteChars from '../api/models/FavoriteChars';
import FavoriteComics from '../api/models/FavoriteComics';
import Users from '../api/models/Users';
import configDatabase from '../config/database';

const models = [
  Users,
  FavoriteChars,
  FavoriteComics
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(configDatabase);

    models.forEach((model) => {
      model.init(this.connection);
    });

    models.forEach((model) => {
      model.associate && model.associate(this.connection.models);
    });
  }
}

export default new Database();