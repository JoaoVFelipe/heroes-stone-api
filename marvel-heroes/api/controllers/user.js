import Users from '../models/Users';
import bcrypt from 'bcryptjs';

module.exports = () => {
  const controller = {};

  controller.getProfile = async (req, res) => {
    const { userId } = req;
    const userData = await Users.findByPk({id: userId});
    return res.status(200).send(userData);
  };

  controller.createProfile = async (req, res) => {
    const { pass } = req.body;
    req.body.password = await bcrypt.hash(pass, 8);

    await Users.create({ ...req.body });
    return res.status(201).send();
  };

  controller.updateProfile = async (req, res) => {
    const { userId } = req;
    const { pass } = req.body;

    if(pass) {
      req.body.password = await bcrypt.hash(pass, 8);
    }

    const user = await Users.findByPk(userId);
    const userData = await user.update(req.body);
    return res.status(200).send(userData);
  };


  return controller;
};
