/* eslint-disable no-unused-expressions */
import Sequelize from 'sequelize';

import configDatabase from '../config/database';

const models = [];

class DataBase {
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

export default new DataBase();