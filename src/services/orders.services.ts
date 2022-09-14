import connection from '../models/connection';
import OrderModel from '../models/orders.models';
import UserModel from '../models/users.models';
import Order from '../interfaces/order.interface';
import validateToken from '../validations/validateToken';
import HttpReturn from '../interfaces/http.interface';

export default class OrderServices {
  public orderModel: OrderModel;

  public userModel: UserModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
    this.userModel = new UserModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.orderModel.getAll();
    return result;
  }

  public async create(productsIds: number[], token: string): Promise<Order | HttpReturn> {
    const user = validateToken.getUserByToken(token);
    const userId = await this.userModel.getById(user);
    const result = await this.orderModel.create(userId, productsIds);
    return result;
  }
}