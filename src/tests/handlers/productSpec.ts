import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';
import { Product } from '../../models/product';

const request = supertest(app);

describe('Tests for /products api endpoint', () => {
  const user1: User = {
    firstname: 'Jenny',
    lastname: 'Johnson',
    password: 'correctpassword'
  };

  let userToken: string;

  const product1: Product = {
    name: 'kettle',
    price: 50
  };

  const product2: Product = {
    name: 'iron',
    price: 75
  };

  beforeAll(async () => {
    const response = await request.post('/users').send(user1);
    userToken = response.body.token;
  });

  it('should create new product', async () => {
    await request
      .post('/products')
      .send(product1)
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);
  });

  it('should get list of all products', async () => {
    await request
      .get('/products')
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);
  });

  it('should get product with id 1', async () => {
    await request
      .get('/products/1')
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);
  });

  it('should allow updating product', async () => {
    await request
      .put('/products/1')
      .send(product2)
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);
  });

  it('should not allow to delete product as token is not provided', async () => {
    await request.delete('/products/100').expect(401);
  });

  it('should allow deletion of products', async () => {
    await request
      .delete('/products/100')
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);
  });
});
