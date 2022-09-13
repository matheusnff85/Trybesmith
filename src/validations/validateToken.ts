import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/users.models';
import Login from '../interfaces/login.interface';

dotenv.config();

const secret: string = process.env.SECRET || 'secret';

export default class TokenValidation {
  public userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }

  public async validateToken(userObj: Login) {
    try {
      const { token, username, password } = userObj;
      if (!token) {
        return { code: 401, message: 'Token not found' };
      }
      jwt.verify(token, secret);
      const result = await this.userModel.verifyUser(username, password);
      if (result === false) return { code: 401, message: 'Invalid token' };
      return true;
    } catch (error) {
      return { code: 401, message: 'Invalid token' };
    }
  }
}