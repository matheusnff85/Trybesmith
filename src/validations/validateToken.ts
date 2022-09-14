import { NextFunction, Response, Request } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const SECRET: string = process.env.SECRET || 'supersecreto';

const validateToken = (token: string) => {
  try {
    const { data } = jwt.verify(token, SECRET) as { data: string };
    return data;
  } catch (error) {
    const err = new Error('Invalid token');
    return err;
  }
};

const getUserByToken = (token: string) => {
  const result = jwt.verify(token, SECRET);
  const loginObj = { username: (<any>result).username };
  return loginObj.username;
};

const verifyToken = async (req: Request, res: Response, next:NextFunction) => {
  const token = req.headers.authorization;
  if (!token || token === 'undefined' || token === '') {
    return res.status(401).json({ message: 'Token not found' });
  }

  const isValidToken = validateToken(token);
  
  if (isValidToken instanceof Error) {
    return res.status(401).json({ message: isValidToken.message });
  }
  next();
};

export default {
  verifyToken,
  getUserByToken,
};