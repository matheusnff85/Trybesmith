import connection from '../models/connection';
import ProductModel from '../models/products.models';
import Product from '../interfaces/product.interface';
import validations from '../validations/validations';
import HttpReturn from '../interfaces/http.interface';

export default class ProductServices {
  public productModel: ProductModel;
  
  constructor() {
    this.productModel = new ProductModel(connection);
  }

  public async getAll(): Promise<Product[]> {
    return this.productModel.getAll();
  }

  public async create(name: string, amount: string): Promise<Product | HttpReturn> {
    const validate = validations.validateProduct({ name, amount });
    if (validate !== true) return validate; 
    return this.productModel.create({ name, amount });
  }
}