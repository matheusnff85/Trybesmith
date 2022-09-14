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

  public create = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const { productsIds } = req.body;
    const result = await this.orderServices.create(productsIds, token as string);
    if ('code' in result) {
      return res.status(Number(result.code)).json(result.message);
    }
    return res.status(201).json(result);
  };
}