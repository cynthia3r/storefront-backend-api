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
    const response = await request
      .get('/users/1')
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);

    expect(response.body.id).toEqual(1);
    expect(response.body.firstname).toEqual('Ian');
  });

  it('should get list of all users', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);

    expect(response.body.length).toEqual(1);
    expect(response.body[0].firstname).toEqual('Ian');
  });

  it('should allow updating user data', async () => {
    const response = await request
      .put('/users/1')
      .send({
        first_name: 'Ann',
        last_name: 'Lee',
        password: 'correctpassword'
      })
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);

    expect(response.body.id).toEqual(1);
    expect(response.body.firstname).toEqual('Ann');
  });

  it('should not allow to delete user as token is not provided', async () => {
    await request.delete('/users/1').expect(401);
  });

  it('should allow deletion of user', async () => {
    const response = await request
      .delete('/users/1')
      .set('Authorization', 'bearer ' + userToken)
      .expect(200);

    expect(response.body.id).toEqual(1);
    expect(response.body.firstname).toEqual('Ann');
  });
});
