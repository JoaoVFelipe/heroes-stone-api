import Sequelize, { Model } from 'sequelize';

class FavoriteChars extends Model {
  static init(sequelize) {
    super.init({
      charId: Sequelize.STRING,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
    });
  }
}

export default FavoriteChars;
