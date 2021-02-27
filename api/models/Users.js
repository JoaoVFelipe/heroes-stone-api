import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Users extends Model {
  static init(sequelize) {
    super.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,

            get() {
                return String(this.getDataValue('id'));
            },
        },
        name: Sequelize.STRING,
        bio: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        password_raw: Sequelize.VIRTUAL,
     }, { sequelize });

    // Encrypts password before saving a new user
    this.addHook('beforeSave', async (user) => {
      if (user.password_raw) { user.password = await bcrypt.hash(user.password_raw, 8); }
    });

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
