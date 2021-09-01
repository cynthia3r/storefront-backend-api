import client from '../database';

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderProductStore {
  async index(): Promise<OrderProduct[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM order_products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get order_products lists. Error: ${err}`);
    }
  }

  async show(id: number): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM order_products WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order_product id ${id}. Error: ${err}`);
    }
  }

  async create(ordProd: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [ordProd.order_id, ordProd.product_id, ordProd.quantity]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add new order entry ${ordProd.order_id} for product ${ordProd.product_id}. Error: ${err}`
      );
    }
  }

  async update(id: number, ordProd: OrderProduct): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql = 'UPDATE order_products SET order_id = $1, product_id = $2, quantity = $3 WHERE id=${id} RETURNING *';
      const result = await conn.query(sql, [ordProd.order_id, ordProd.product_id, ordProd.quantity]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order_products entry for order id ${ordProd.order_id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<OrderProduct> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM order_products WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order_products entry with ${id}. Error: ${err}`);
    }
  }
}
