import { Request, Response } from 'express';
import OrderServices from '../services/orders.services';

export default class OrderController {
  private orderServices: OrderServices;

  constructor() {
    this.orderServices = new OrderServices();
  }

  public getAll = async (req: Request, res: Response) => {
    const result = await this.orderServices.getAll();
    return res.status(200).json(result);
  };
}