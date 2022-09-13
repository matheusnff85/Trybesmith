import createToken from '../helpers/createToken';
import Login from '../interfaces/login.interface';
import connection from '../models/connection';
import UserModel from '../models/users.models';
import validateLogin from '../validations/validations';

export default class LoginServices {
  public userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }

  public async login(loginObj: Login) {
    const validateResult = validateLogin(loginObj);
    if (validateResult !== true) return validateResult;
    const { username, password } = loginObj;
    const result = await this.userModel.getByUsername(username);
    if (typeof result === 'string' || result.password !== password) {
      return { code: 401, message: 'Username or password invalid' };
    };
    const token = createToken(username, password);
    return token;
  }
}