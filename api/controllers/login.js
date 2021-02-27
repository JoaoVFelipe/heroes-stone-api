import jwt from 'jsonwebtoken';
import Users from '../models/Users';

module.exports = () => {
  const controllers = {};

  controllers.login = async (req, res) => {
    const { email } = req.body;

    const existingUser = await Users.findOne({
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt']
        },
        where: { email },
    });

    // Logs in
    const token = jwt.sign(
        { userId: existingUser.id }, 
        process.env.SECRET, 
        { expiresIn: process.env.EXPIRES_IN}
    );

    res.setHeader('Authorization', token);
    return res.status(201).send({
      token: token,
      userData: existingUser
    });
  };

  return controllers;
};
