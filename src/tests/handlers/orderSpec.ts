import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';
import { Order } from '../../models/order';

const request = supertest(app);

describe('Tests for /orders api endpoint', () => {
  const user1: User = {
    firstname: 'Jenny',
    lastname: 'Johnson',
    password: 'correctpassword'
  };

  const user2: User = {
    firstname: 'Calvin',
    lastname: 'Klein',
    password: 'correctpassword'
  };

  let userToken1: string;

  const order1: Order = {
    user_id: 1,
    status: 'active'
  };

  const order2: Order = {
    user_id: 2,
    status: 'complete'
  };

  beforeAll(async () => {
    let response = await request.post('/users').send(user1);
    userToken1 = response.body.token;
    response = await request.post('/users').send(user2);
  });

  it('should create new order', async () => {
    await request
      .post('/orders')
      .send(order1)
      .set('Authorization', 'bearer ' + userToken1)
      .expect(200);
  });

  it('should get list of all orders', async () => {
    const response = await request
      .get('/orders')
      .set('Authorization', 'bearer ' + userToken1)
      .expect(200);

    expect(response.body.length).toEqual(1);
  });

  it('should get order with id 1', async () => {
    const response = await request
      .get('/orders/1')
      .set('Authorization', 'bearer ' + userToken1)
      .expect(200);

    expect(response.body.id).toEqual(1);
  });

  it('should allow updating order', async () => {
    const response = await request
      .put('/orders/1')
      .send(order2)
      .set('Authorization', 'bearer ' + userToken1)
      .expect(200);

    expect(response.body.id).toEqual(1);
    expect(response.body.status).toEqual(true);
  });

  it('should not allow to delete order as token is not provided', async () => {
    await request.delete('/orders/1').expect(401);
  });

  it('should allow deletion of order', async () => {
    const response = await request
      .delete('/orders/1')
      .set('Authorization', 'bearer ' + userToken1)
      .expect(200);

    expect(response.body.id).toEqual(1);
  });
});
