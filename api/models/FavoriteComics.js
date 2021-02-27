import Sequelize, { Model } from 'sequelize';

class FavoriteComics extends Model {
  static init(sequelize) {
    super.init({
      comicId: Sequelize.STRING,
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

export default FavoriteComics;
