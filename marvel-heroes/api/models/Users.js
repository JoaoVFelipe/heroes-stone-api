import Sequelize, { DataTypes, Model } from 'sequelize';
class Users extends Model {
  static init(sequelize) {
    super.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,

            get() {
                return String(this.getDataValue('id'));
            },
        },
        name: DataTypes.STRING,
        bio: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
     }, { sequelize });

    return this;
  }

  static associate(models) {
    this.hasMany(models.FavoriteChars, {
      foreignKey: 'charId',
      as: 'char',
    });
  }
}


export default Users;
