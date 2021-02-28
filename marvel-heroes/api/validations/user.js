import Users from '../models/Users';
import FieldMessage from './fieldMessage';
import * as Yup from 'yup';

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

  validations.createProfile = async (req) => {
    const errors = [];
    const { pass, email } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().nullable().trim().strict().required('Name is required!'),
      email: Yup.string().nullable().trim().email('Invalid e-mail!').strict().required('E-mail is required!'),
      pass: Yup.string().nullable().trim().strict().required('Password is required!').min(6, 'Password has to be at least 6 characters long.'),
      bio: Yup.string().strict().nullable(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      err.inner.forEach((error) => {
        errors.push(new FieldMessage(error.path, error.message));
      });
      return errors;
    }

    const existingUser = await Users.findOne({
      where: { email },
    });

    if (existingUser) {
      errors.push(new FieldMessage('email', 'E-mail already in use!'));
      return errors;
    }
    
    return errors;
  };

  validations.updateProfile = async (req) => {
    const errors = [];
    const { userId } = req;
    const { pass, email } = req.body;

    const existingUser = await Users.findByPk(Number(userId));
    if (!existingUser) {
      errors.push(new FieldMessage('id', 'User not found...'));
    }

    const schema = Yup.object().shape({
      name: Yup.string().strict().trim().nullable(),
      email: Yup.string().strict().trim().nullable().email('Invalid e-mail!'),
      pass: Yup.string().strict().trim().nullable().min(6, 'Password has to be at least 6 characters long.'),
      bio: Yup.string().strict().trim().nullable(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      err.inner.forEach((error) => {
        errors.push(new FieldMessage(error.path, error.message));
      });
      return errors;
    }

    if (email) {
      const existingUser = await Users.findOne({ where: { email } });
      if (existingUser) {
        errors.push(new FieldMessage('email', 'E-mail already in use!'));
        return errors;
      }
    }

    return errors;
  };

  return validations;
};
