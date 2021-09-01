import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async create(prod: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [prod.name, prod.price]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new product ${prod.name}. Error: ${err}`);
    }
  }

  async update(id: number, prod: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'UPDATE products SET name = ($1), price = ($2) WHERE id=($3) RETURNING *';
      const result = await conn.query(sql, [prod.name, prod.price, id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update product ${prod.id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
