import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send();
  }

  const [bearer, token] = authHeader.split(' ');

  try {
    const {
      userId,
    } = await promisify(jwt.verify)(token, process.env.SECRET);

    req.userId = userId;

    return next();
  } catch (error) {
    return res.status(401).send();
  }
};
