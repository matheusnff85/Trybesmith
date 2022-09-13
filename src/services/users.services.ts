import connection from '../models/connection';
import UserModel from '../models/users.models';
import User from '../interfaces/user.interface';

export default class UserServices {
  public userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }

  public async create(userObj: User): Promise<string> {
    const result = await this.userModel.create(userObj);
    return result;
  }
}