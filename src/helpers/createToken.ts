import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret: string = process.env.SECRET || 'secret';

const createToken = (username: string, password: string): string => {
  const token = jwt.sign({ username, password }, secret);
  return token;
};

export default createToken;