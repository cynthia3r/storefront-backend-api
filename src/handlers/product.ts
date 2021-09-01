import express from 'express';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const products = await store.index();
    // res.json(products);
    res.send(products);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const product = await store.show(parseInt(req.params.id));
    // res.json(product);
    res.send(product);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const create = async (req: express.Request, res: express.Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price
    };
    const newProduct = await store.create(product);
    // res.json(newProduct);
    res.send(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err.message);
  }
};

const edit = async (req: express.Request, res: express.Response) => {
  try {
    const product: Product = {
      // id: parseInt(req.params.id),
      name: req.body.name,
      price: req.body.price
    };

    const editedProduct = await store.update(parseInt(req.params.id), product);
    // res.json(editedProduct);
    res.send(editedProduct);
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

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', create);
  app.put('/products/:id', edit);
  app.delete('/products/:id', destroy);
};

export default productRoutes;
