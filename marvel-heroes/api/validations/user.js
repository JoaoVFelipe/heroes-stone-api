import Users from '../models/Users';
import FieldMessage from './fieldMessage';

module.exports = () => {
  const validations = {};

  validations.getProfile = async (req) => {
    const errors = [];
    const { userId } = req;

    const user = await Users.findByPk(Number(userId));
    if (!user) {
      errors.push(new FieldMessage('userId', 'User not found'));
      return errors;
    }

    return errors;
  };

  return validations;
};
