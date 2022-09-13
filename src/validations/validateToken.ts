import { NextFunction, Response } from 'express';
import dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';
import { RequestWithUser } from '../types/requestWithToken';
import connection from '../models/connection';
import UserModel from '../models/users.models';

dotenv.config();

const SECRET: string = process.env.SECRET || 'supersecreto';
const invalidToken = { code: 401, message: 'Invalid token' };

const verifyToken = (token: string) => {
  const result = verify(token, SECRET);
  const loginObj = { username: (<any>result).username, password: (<any>result).password };
  return loginObj;
};

const validateToken = async (req: RequestWithUser, res: Response, next:NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });
  try {
    const loginObj = verifyToken(token);
    const userModel = new UserModel(connection);
    const user = await userModel.getByUsername(loginObj.username);
    if (typeof user === 'string') return res.status(401).json({ message: invalidToken.message });
    if (user.password !== loginObj.password) {
      return res.status(401).json({ message: invalidToken.message });
    }
    const { id } = user;
    const { username } = loginObj;
    req.user = { id: id as number, username };
    next();
  } catch (error) {
    res.status(invalidToken.code).json({ message: invalidToken.message });
  }
};

export default validateToken;