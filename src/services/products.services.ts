import connection from '../models/connection';
import ProductModel from '../models/products.models';
import Product from '../interfaces/product.interface';

export default class ProductServices {
  public productModel: ProductModel;
  
  constructor() {
    this.productModel = new ProductModel(connection);
  }

  public async getAll(): Promise<Product[]> {
    return this.productModel.getAll();
  }

  public async create(name: string, amount: string): Promise<Product> {
    return this.productModel.create({ name, amount });
  }
}