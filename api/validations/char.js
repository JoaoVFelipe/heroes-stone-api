import FavoriteChars from '../models/FavoriteChars';
import Users from '../models/Users';

import FieldMessage from './fieldMessage';

module.exports = () => {
  const validations = {};

  validations.listAllFavoriteChars = async (req) => {
    const errors = [];
    const { userId } = req;

    const user = await Users.findByPk(Number(userId));
    if (!user) {
      errors.push(new FieldMessage('userId', 'User not found'));
      return errors;
    }

    return errors;
  };

  validations.favoriteChars = async (req) => {
    const errors = [];
    const { charId } = req.params;
    const { userId } = req;

    const user = await Users.findByPk(Number(userId));
    if (!user) {
      errors.push(new FieldMessage('userId', 'User not found'));
      return errors;
    }

    const existingFavorite = await FavoriteChars.findOne({
      where: { userId, charId }
    });
    if (existingFavorite) {
      errors.push(new FieldMessage('charId', 'Already favorited this char!'));
    }

    return errors;
  };

  validations.unfavoriteChars = async (req) => {
    const errors = [];
    const { charId } = req.params;
    const { userId } = req;

    const user = await Users.findByPk(Number(userId));
    if (!user) {
      errors.push(new FieldMessage('id', 'User not found'));
      return errors;
    }

    const existingFavorite = await FavoriteChars.findOne({
      where: { userId, charId }
    });

    if (!existingFavorite) {
      errors.push(new FieldMessage('charId', 'Favorite char not found!'));
    }

    return errors;
  };

  return validations;
};
