import express from 'express';
import { Order, OrderStore } from '../models/order';
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new OrderStore();

const index = async (_req: express.Request, res: express.Response) => {
  try {
    // express route handler calling a model method
    const orders = await store.index();
    // res.json(orders);
    res.send(orders);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const order = await store.show(parseInt(req.params.id));
    // res.json(order);
    res.send(order);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const create = async (req: express.Request, res: express.Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status
    };
    const newOrder = await store.create(order);
    // res.json(newOrder);
    res.send(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const edit = async (req: express.Request, res: express.Response) => {
  try {
    const order: Order = {
      // id: parseInt(req.params.id),
      user_id: req.body.user_id,
      status: req.body.status
    };

    const editedOrder = await store.update(parseInt(req.params.id), order);
    // res.json(editedOrder);
    res.send(editedOrder);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const destroy = async (req: express.Request, res: express.Response) => {
  try {
    const deleted = await store.delete(parseInt(req.params.id));
    // res.json(deleted);
    res.send(deleted);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const showCurrentOrderForUser = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.params.user_id;
    const order = await store.getCurrentOrderByUserId(userId);
    // res.json(order);
    res.send(order);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const showCompletedOrdersForUser = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.params.user_id;
    const order = await store.getCompletedOrdersByUserId(userId);
    // res.json(order);
    res.send(order);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index);
  app.get('/orders/:id', verifyAuthToken, show);
  app.post('/orders', verifyAuthToken, create);
  app.put('/orders/:id', verifyAuthToken, edit);
  app.delete('/orders/:id', verifyAuthToken, destroy);
  app.get('/orders/current/:user_id', verifyAuthToken, showCurrentOrderForUser);
  app.get('/orders/completed/:user_id', verifyAuthToken, showCompletedOrdersForUser);
};

export default orderRoutes;
