import dotenv from 'dotenv';
import { Pool } from 'pg';

//initializes the environment variables
dotenv.config();

// destructure the variables out of process.env js object
const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_TEST_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV } =
  process.env;

let client: Pool;

console.log(ENV);

if (ENV === 'dev') {
  // pool is a connection to postgres database
  client = new Pool({
    host: POSTGRES_HOST,
    port: POSTGRES_PORT as unknown as number,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  });
} else if (ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    port: POSTGRES_PORT as unknown as number,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  });
} else {
  client = new Pool();
}

export default client;
