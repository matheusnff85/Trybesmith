import Joi from 'joi';
import Login from '../interfaces/login.interface';
import Product from '../interfaces/product.interface';
import User from '../interfaces/user.interface';

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

const userSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.base': '422|"username" must be a string',
    'string.min': '422|"username" length must be at least 3 characters long',
    'any.required': '400|"username" is required',
  }),
  classe: Joi.string().min(3).required().messages({
    'string.base': '422|"classe" must be a string',
    'string.min': '422|"classe" length must be at least 3 characters long',
    'any.required': '400|"classe" is required',
  }),
  level: Joi.number().greater(0).required().messages({
    'number.base': '422|"level" must be a number',
    'number.greater': '422|"level" must be greater than or equal to 1',
    'any.required': '400|"level" is required',
  }),
  password: Joi.string().min(8).required().messages({
    'string.base': '422|"password" must be a string',
    'string.min': '422|"password" length must be at least 8 characters long',
    'any.required': '400|"password" is required',
  }),
});

const validateUser = (userObj: User) => {
  const { error } = userSchema.validate(userObj);
  if (error) {
    const [code, message] = error.details[0].message.split('|');
    return { code, message };
  }
  return true;
};

const productIdSchema = Joi.array().items(Joi.number().required()).required().messages({
  'array.base': '422|"productsIds" must be an array',
  'array.items': '422|"productsIds" must include only numbers',
  'any.required': '400|"productsIds" is required',
});

const validateProductsIds = (productsIds: number[]) => {
  const { error } = productIdSchema.validate(productsIds);
  if (error) {
    const [code, message] = error.details[0].message.split('|');
    return { code, message };
  }
  return true;
};

export default {
  validateLogin,
  validateProduct,
  validateUser,
  validateProductsIds,
};