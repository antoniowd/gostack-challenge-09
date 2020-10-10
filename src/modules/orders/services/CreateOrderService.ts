import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);
    const productPrices = await this.productsRepository.findAllById(products);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    if (products.length === 0) {
      throw new AppError('You must provide one product at least');
    }

    const newProductQuantities: IProduct[] = [];
    const newProducts = products.map(product => {
      const productFound = productPrices.find(
        productPrice => productPrice.id === product.id,
      );

      if (!productFound) {
        throw new AppError('Product price not found');
      }

      if (productFound.quantity < product.quantity) {
        throw new AppError('Insufficient stock');
      }

      newProductQuantities.push({
        id: product.id,
        quantity: productFound.quantity - product.quantity,
      });

      return {
        product_id: product.id,
        quantity: product.quantity,
        price: productFound.price,
      };
    });

    const order = await this.ordersRepository.create({
      customer,
      products: newProducts,
    });

    await this.productsRepository.updateQuantity(newProductQuantities);

    return order;
  }
}

export default CreateOrderService;
