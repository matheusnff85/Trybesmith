import connection from '../models/connection';
import OrderModel from '../models/orders.models';
import Order from '../interfaces/order.interface';

export default class OrderServices {
  public orderModel: OrderModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.orderModel.getAll();
    return result;
  }
}