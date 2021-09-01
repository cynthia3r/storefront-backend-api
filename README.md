# Storefront Backend Project

## Project Overview
The task is to create a RESTful JavaScript Node API with express for an online retail store.

## API functionality
The API will support the following functionality:
* allow users to sign up and sign in
* allow products to be created, stored, updated and deleted from database
* allows users to browse an index of all products, see the specifics of a single product
* require users to be signed in to perform certain actions
* allow users to create orders and add products to orders
* allow users to view the added products in the cart
## Technologies used
* `node.js` and `express` to build the server
* `npm` or `yarn` dependency manager
* `typescript` to reduce type errors
* `jasmine` and `supertest` for unit testing
* `prettier` and `eslint` for formatting/linting
* `postgres` for database
* `db-migrate` for database migration
* `jsonwebtoken` for working with JWTs for authentication and protected endpoints
* `dotenv` for managing environment variables
* `bcrypt` for password encryption/hashing for security
## Project dependencies
Please refer dependencies, devDependencies and scripts section in [`package.json`](package.json) for more details.
## Installation, setup and usage
### Install dependencies
* install all project dependencies with `yarn` or `npm install`
### Setup postgres image inside docker container
- start docker container using [`docker-compose.yml`](docker-compose.yml) which contains information related to postgres image `sudo docker-compose up`
- launch bash terminal within the docker container
`sudo docker exec -i -t <docker_container_name> bash`
example: `sudo docker exec -i -t storefront-backend-api_postgres_1 bash`
- login to postgres server (running on default port 5432)
`psql -U <postgres_user>`
- create store database for development env
`CREATE DATABASE store;`
- create store_test database for test env
`CREATE DATABASE store_test;`
- create a new database user and grant the user access to the database
```bash
CREATE USER <db_user_name> WITH PASSWORD <db_user_password>;
GRANT ALL PRIVILEGES ON DATABASE store TO <db_user_name>;
GRANT ALL PRIVILEGES ON DATABASE store_test TO <db_user_name>;
```
- connect to database `\c <db_name>`, note: db for dev env is `store` and db for test env is `store_test`
- display tables `\dt`

### Setup Environment variables
Create .env file in the project root directory and setup the following environment variables
```bash
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DB=store
POSTGRES_TEST_DB=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=******
ENV=dev
BCRYPT_PASSWORD=******
SALT_ROUNDS=10
TOKEN_SECRET=******
```

Note: please set the password parameters which are marked as ******

### Run database migrations
`db-migrate up`
### Run development server
* start the development server with `yarn start` or `npm start`.
### Run the server in watch mode
* start the build server with `yarn watch` or `npm run watch`

Note: The server runs on `http://localhost:3000/`

## Best practices
### Run Formatter/linter
* run code formatter with `yarn prettier` or `npm run prettier`
* run eslint with `yarn lint` or `npm run lint`
### Run tests
* test scripts can be run using `yarn test` or `npm run test`.






