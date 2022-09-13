import { Request, Response } from 'express';
import ProductServices from '../services/products.services';

export default class ProductController {
  private productServices: ProductServices;

  constructor() {
    this.productServices = new ProductServices();
  }

  public getAll = async (req: Request, res: Response) => {
    const result = await this.productServices.getAll();
    return res.status(200).json(result);
  };

  public create = async (req: Request, res: Response) => {
    const { name, amount } = req.body;
    const newProduct = await this.productServices.create(name, amount);
    if ('code' in newProduct) {
      return res.status(Number(newProduct.code)).json({ message: newProduct.message });
    }
    return res.status(201).json(newProduct);
  };
}