import { Request, Response } from 'express';
import LoginServices from '../services/login.services';

export default class LoginController {
  private loginServices: LoginServices;

  constructor() {
    this.loginServices = new LoginServices();
  }

  public login = async (req: Request, res: Response) => {
    const result = await this.loginServices.login(req.body);
    if (typeof result !== 'string') {
      return res.status(result.code).json({ message: result.message });
    }
    return res.status(200).json({ token: result });
  };
}