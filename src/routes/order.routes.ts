import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import orderValidate from '../validations/orderValidate';
import validateToken from '../validations/validateToken';

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.get('/', orderController.getAll);
orderRouter.post(
  '/', 
  validateToken.verifyToken, 
  orderValidate.validateProductsIds, 
  orderController.create,
);

export default orderRouter;