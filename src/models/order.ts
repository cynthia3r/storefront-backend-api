import client from '../database';

export type Order = {
  id: number;
  user_id: string;
  status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(ord: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [ord.user_id, ord.status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new order for user ${ord.user_id}. Error: ${err}`);
    }
  }

  async update(id: number, ord: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'UPDATE orders SET user_id = $1, status = $2 WHERE id=${id} RETURNING *';
      const result = await conn.query(sql, [ord.user_id, ord.status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update order ${ord.id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
