import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';

const request = supertest(app);

describe('Tests for /users api endpoint', () => {
  const user: User = {
    firstname: 'Ian',
    lastname: 'Lee',
    password: 'correctpassword'
  };
  let userToken: string;

  it('should create new user', async () => {
    const response = await request.post('/users').send(user);
    expect(200);
    userToken = response.body.token;
    console.log('userToken', userToken);
  });

  it('should authenticate and allow user to login', async () => {
    const response = await request.post('/users/login').send(user);
    expect(response.status).toBe(200);
  });

  it('should fail to authenticate user with incorrect password', async () => {
    await request.post('/users/login').send({
      firstname: 'Ian',
      lastname: 'Lee',
      password: 'incorrectPassword'
    });
    expect(400);
  });

  it('should get user with id 1', async () => {
    await request
      .get('/users/1')
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);
  });

  it('should get list of all users', async () => {
    await request
      .get('/users')
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);
  });

  it('should allow updating user data', async () => {
    await request
      .put('/users/1')
      .send({
        firstname: 'Kelly',
        lastname: 'Shi',
        password: 'correctpassword'
      })
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);
  });

  it('should not allow to delete user as token is not provided', async () => {
    await request.delete('/users/100').expect(401);
  });

  it('should allow deletion of user', async () => {
    await request
      .delete('/users/100')
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);
  });
});
