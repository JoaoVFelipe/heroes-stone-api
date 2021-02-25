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
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
     }, { sequelize });

    // Encrypts password before saving a new user
    this.addHook('beforeSave', async (user) => {
      if (user.password) { user.password_hash = await bcrypt.hash(user.password, 8); }
    });

    return this;
  }
}

export default Users;
