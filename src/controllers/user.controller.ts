import { Request, Response } from 'express';
import UserServices from '../services/users.services';

export default class UserController {
  private userServices: UserServices;
  
  constructor() {
    this.userServices = new UserServices();
  }

  public create = async (req: Request, res: Response) => {
    const result = await this.userServices.create(req.body);
    return res.status(201).json({ token: result });
  };
}