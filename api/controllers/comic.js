import Users from '../models/Users';
import FavoriteComics from '../models/FavoriteComics';

module.exports = () => {
  const controller = {};

  controller.listAllFavoriteComics = async (req, res) => {
    const { userId } = req;

    const favoriteComics = await FavoriteComics.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: Users,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
          where: { id: userId },
        },
      ]
    });

    return res.status(200).send(favoriteComics);
  };

  controller.favoriteComic = async (req, res) => {
    const { userId } = req;
    const { comicId } = req.params;
    await FavoriteComics.create({ userId, comicId });

    return res.status(201).send();
  };

  controller.unfavoriteComic = async (req, res) => {
    const { userId } = req;
    const { comicId } = req.params;
    await FavoriteComics.destroy({
      where: {
        userId, comicId,
      },
    });

    return res.status(204).send();
  };

  return controller;
};
