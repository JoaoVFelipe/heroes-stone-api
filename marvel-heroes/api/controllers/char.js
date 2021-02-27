import Users from '../models/Users';
import FavoriteChars from '../models/FavoriteChars';

module.exports = () => {
  const controller = {};

  controller.listAllFavoriteChars = async (req, res) => {
    const { userId } = req;

    const favoriteCharacters = await FavoriteChars.findAll({
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

    return res.status(200).send(favoriteCharacters);
  };

  controller.favoriteChars = async (req, res) => {
    const { userId } = req;
    const { charId } = req.params;
    await FavoriteChars.create({ userId, charId });

    return res.status(201).send();
  };

  controller.unfavoriteChars = async (req, res) => {
    const { userId } = req;
    const { charId } = req.params;
    await FavoriteChars.destroy({
      where: {
        userId, charId,
      },
    });

    return res.status(204).send();
  };

  return controller;
};
