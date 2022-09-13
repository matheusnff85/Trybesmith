import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import validateToken from '../validations/validateToken';

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.get('/', orderController.getAll);
orderRouter.post('/', validateToken);

export default orderRouter;