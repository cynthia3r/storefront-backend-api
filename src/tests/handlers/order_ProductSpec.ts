import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';
import { Order } from '../../models/order';
import { Product } from '../../models/product';
import { OrderProduct } from '../../models/order_product';

const request = supertest(app);

describe('Tests for /order_products api endpoint', () => {
  const user: User = {
    firstname: 'Jasmin',
    lastname: 'Tia',
    password: 'correctpassword'
  };

  let userToken: string;

  const order: Order = {
    user_id: 1,
    status: 'active'
  };

  const product: Product = {
    name: 'chip',
    price: 150
  };

  const order_product: OrderProduct = {
    order_id: 1,
    product_id: 1,
    quantity: 5
  };

  const order_product1: OrderProduct = {
    order_id: 1,
    product_id: 1,
    quantity: 9
  };

  beforeAll(async () => {
    const response = await request.post('/users').send(user);
    userToken = response.body.token;

    await request
      .post('/products')
      .send(product)
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);

    await request
      .post('/orders')
      .send(order)
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);
  });

  it('should create new order_product', async () => {
    await request
      .post('/order_products')
      .send(order_product)
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);
  });

  it('should get list of all order_products', async () => {
    await request
      .get('/order_products')
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);
  });

  it('should get order_product with id 1', async () => {
    await request
      .get('/order_products/1')
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);
  });

  it('should allow updating order_product', async () => {
    await request
      .put('/order_products/1')
      .send(order_product1)
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);
  });

  it('should not allow to delete order_products as token is not provided', async () => {
    await request.delete('/order_products/100').expect(401);
  });

  it('should allow deletion of order_products', async () => {
    await request
      .delete('/order_products/100')
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);
  });
});
