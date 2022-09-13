import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secret: string = process.env.SECRET || 'secret';

const validateToken = (token: string) => {
  const result = jwt.verify(token, secret);
  const loginObj = { username: (<any>result).username, password: (<any>result).password };
  return loginObj;
};

export default {
  validateToken,
};
