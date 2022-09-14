import { NextFunction, Request, Response } from 'express';

class ValidateProductsIds {
  public static validateProductsIds = (req: Request, res: Response, next: NextFunction) => {
    const { productsIds } = req.body;
    
    if (!productsIds) {
      return res.status(400).json({ message: '"productsIds" is required' });
    }

    if (productsIds.length === 0) {    
      return res.status(422).json({ message: '"productsIds" must include only numbers' });
    }

    if (typeof (productsIds as []) !== 'object') {
      return res.status(422).json({ message: '"productsIds" must be an array' });
    }
    
    next();
  };
}

export default ValidateProductsIds;