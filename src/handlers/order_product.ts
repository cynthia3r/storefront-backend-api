import express from 'express';
import { OrderProduct, OrderProductStore } from '../models/order_product';

const store = new OrderProductStore();

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const order_products = await store.index();
    // res.json(order_products);
    res.send(order_products);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const order_product = await store.show(parseInt(req.params.id));
    // res.json(order_product);
    res.send(order_product);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const create = async (req: express.Request, res: express.Response) => {
  try {
    const order_product: OrderProduct = {
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity
    };
    const newOrderProductEntry = await store.create(order_product);
    // res.json(newOrderProductEntry);
    res.send(newOrderProductEntry);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const edit = async (req: express.Request, res: express.Response) => {
  try {
    const order_product: OrderProduct = {
      // id: parseInt(req.params.id),
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity
    };

    const editedOrderProductEntry = await store.update(parseInt(req.params.id), order_product);
    // res.json(editedOrderProductEntry);
    res.send(editedOrderProductEntry);
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

const orderProductRoutes = (app: express.Application) => {
  app.get('/order_products', index);
  app.get('/order_products/:id', show);
  app.post('/order_products', create);
  app.put('/order_products/:id', edit);
  app.delete('/order_products/:id', destroy);
};

export default orderProductRoutes;
