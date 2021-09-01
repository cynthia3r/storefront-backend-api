import client from '../database';
import bcrypt from 'bcrypt';

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
      //BCRYPT_PASSWORD is used as pepper to generate the password digest before storing it to the db
      const hash = bcrypt.hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as string));
      const result = await conn.query(sql, [user.firstname, user.lastname, hash]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create new user ${user.firstname}. Error: ${err}`);
    }
  }

  async update(id: string, user: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'UPDATE users SET firstname = $1, lastname = ($2), password = ($3) WHERE id=($4) RETURNING *';
      const result = await conn.query(sql, [user.firstname, user.lastname, user.password, id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update user ${user.id}. Error: ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async authenticate(authUser: User): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE firstname = ($1) AND lastname = ($2)`;

      const result = await conn.query(sql, [authUser.firstname, authUser.lastname]);
      conn.release();
      if (result.rows.length) {
        const matchedUser = result.rows[0];

        if (bcrypt.compareSync(authUser.password + BCRYPT_PASSWORD, matchedUser.password)) {
          return matchedUser;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Could not authenticate user ${authUser.firstname}. Error: ${err.message}`);
    }
  }
}
