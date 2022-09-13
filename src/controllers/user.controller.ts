import { Request, Response } from 'express';
import UserServices from '../services/users.services';

export default class UserController {
  private userServices: UserServices;
  
  constructor() {
    this.userServices = new UserServices();
  }

  public create = async (req: Request, res: Response) => {
    const result = await this.userServices.create(req.body);
    if ('code' in result) {
      return res.status(Number(result.code)).json({ message: result.message });
    }
    return res.status(201).json(result);
  };
}