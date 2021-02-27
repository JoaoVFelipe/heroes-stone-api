import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import Users from '../models/Users';
import FieldMessage from './fieldMessage';

module.exports = () => {
  const validations = {};

  // Function to check the password based on the saved hash
  const checkPassword = (password, user) => {
    return bcrypt.compare(password, user.password);
  }

  validations.login = async (req) => {
    const errors = [];
    const { email, password } = req.body;

    const schema = Yup.object().shape({
        email: Yup.string().nullable().required('Email is required!').email('Invalid e-mail!'),
        password: Yup.string().nullable().required('Password is required!').min(6, 'Password has to be at least 6 characters long.'),
    });

    try {
        await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
        err.inner.forEach((error) => {
            errors.push(new FieldMessage(error.path, error.message));
        });
        return errors;
    }

    // Search for the email on database
    const existingUser = await Users.findOne({ where: { email } });
    if (!existingUser) {
      errors.push(new FieldMessage('email', 'Invalid e-mail!'));
    } else if (!(await checkPassword(password, existingUser))) {
        //Check password match
        errors.push(new FieldMessage('password', 'Invalid password'));
    }
    
    return errors;
  };

  return validations;
};
