import Users from '../models/Users';

module.exports = () => {
  const controller = {};

  controller.getProfile = async (req, res) => {
    const { userId } = req;
    const userData = Users.findByPk({id: userId});
    return res.status(200).send(userData);
  };

  return controller;
};
