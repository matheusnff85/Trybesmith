import Joi from 'joi';
import Login from '../interfaces/login.interface';
import Product from '../interfaces/product.interface';

const validateLogin = (loginObj: Login) => {
  const { username, password } = loginObj;
  if (!username) return { code: 400, message: '"username" is required' };
  if (!password) return { code: 400, message: '"password" is required' };
  return true;
};

const productSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.base': '422|"name" must be a string',
    'string.min': '422|"name" length must be at least 3 characters long',
    'any.required': '400|"name" is required',
  }),
  amount: Joi.string().min(3).required().messages({
    'string.base': '422|"amount" must be a string',
    'string.min': '422|"amount" length must be at least 3 characters long',
    'any.required': '400|"amount" is required',
  }),
});

const validateProduct = (productObj: Product) => {
  const { error } = productSchema.validate(productObj);
  if (error) {
    const [code, message] = error.details[0].message.split('|');
    return { code, message };
  }
  return true;
};

export default {
  validateLogin,
  validateProduct,
};