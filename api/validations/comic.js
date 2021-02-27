import FavoriteComics from '../models/FavoriteComics';
import Users from '../models/Users';

import FieldMessage from './fieldMessage';

module.exports = () => {
  const validations = {};

  validations.listAllFavoriteComics = async (req) => {
    const errors = [];
    const { userId } = req;

    const user = await Users.findByPk(Number(userId));
    if (!user) {
      errors.push(new FieldMessage('userId', 'User not found'));
      return errors;
    }

    return errors;
  };

  validations.favoriteComic = async (req) => {
    const errors = [];
    const { comicId } = req.params;
    const { userId } = req;

    const user = await Users.findByPk(Number(userId));
    if (!user) {
      errors.push(new FieldMessage('userId', 'User not found'));
      return errors;
    }

    const existingFavorite = await FavoriteComics.findOne({
      where: { userId, comicId }
    });
    if (existingFavorite) {
      errors.push(new FieldMessage('comicId', 'Already favorited this comic!'));
    }

    return errors;
  };

  validations.unfavoriteComic = async (req) => {
    const errors = [];
    const { comicId } = req.params;
    const { userId } = req;

    const user = await Users.findByPk(Number(userId));
    if (!user) {
      errors.push(new FieldMessage('id', 'User not found'));
      return errors;
    }

    const existingFavorite = await FavoriteComics.findOne({
      where: { userId, comicId }
    });

    if (!existingFavorite) {
      errors.push(new FieldMessage('comicId', 'Favorite comic not found!'));
    }

    return errors;
  };

  return validations;
};
