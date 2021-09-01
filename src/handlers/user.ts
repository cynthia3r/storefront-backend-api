import express from 'express';
import { User, UserStore } from '../models/user';

const store = new UserStore();

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const users = await store.index();
    // res.json(users);
    res.send(users);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const user = await store.show(req.params.id);
    // res.json(product);
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
    // res.json(newUser);
    res.send(newUser);
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
    // res.json(editedUser);
    res.send(editedUser);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const destroy = async (req: express.Request, res: express.Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    // res.json(deleted);
    res.send(deleted);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
  app.put('/users/:id', edit);
  app.delete('/users/:id', destroy);
};

export default userRoutes;
