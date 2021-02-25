/* eslint-disable no-unused-expressions */
import Sequelize from 'sequelize';
import Users from '../api/models/Users';
import configDatabase from '../config/database';

const models = [
  Users
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
  }
}

export default new Database();