import Login from '../interfaces/login.interface';

const validateLogin = (loginObj: Login) => {
  const { username, password } = loginObj;
  if (!username) return { code: 400, message: '"username" is required' };
  if (!password) return { code: 400, message: '"password" is required' };
  return true;
};

export default validateLogin;