import connection from '../models/connection';
import UserModel from '../models/users.models';
import User from '../interfaces/user.interface';
import validations from '../validations/validations';
import HttpReturn from '../interfaces/http.interface';

export default class UserServices {
  public userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }

  public async create(userObj: User): Promise<HttpReturn> {
    const validate = validations.validateUser(userObj);
    if(validate !== true) return validate;
    const result = await this.userModel.create(userObj);
    return { token: result };
  }
}