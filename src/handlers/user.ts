import express from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/user';
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new UserStore();

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const users = await store.index();
    res.send(users);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const user = await store.show(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const create = async (req: express.Request, res: express.Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    };
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as jwt.Secret);
    res.send({ token });
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const edit = async (req: express.Request, res: express.Response) => {
  try {
    const user: User = {
      // id: parseInt(req.params.id),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    };

    const editedUser = await store.update(req.params.id, user);
    res.send(editedUser);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const destroy = async (req: express.Request, res: express.Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.send(deleted);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const authenticate = async (req: express.Request, res: express.Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    };
    const authUser = await store.authenticate(user);
    const token = jwt.sign({ user: authUser }, process.env.TOKEN_SECRET as jwt.Secret);
    res.send({ token });
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.post('/users', create);
  app.put('/users/:id', verifyAuthToken, edit);
  app.delete('/users/:id', verifyAuthToken, destroy);
  app.post('/users/login', authenticate);
};

export default userRoutes;
