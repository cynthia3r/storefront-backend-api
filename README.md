# Storefront Backend Project

## Project Overview
The task is to create a RESTful API in JavaScript for an online retail store. The API provides information that allows the users to browse an index of all products, see the specifics of a single product, add products to an order and view the added products in the cart.
## Technologies used
* `node.js` and `express` to build the server
* `npm` or `yarn` dependency manager
* `typescript` to reduce type errors
* `jasmine` and `supertest` for unit testing
* `prettier` and `eslint` for formatting/linting
* `postgres` for database
* `db-migrate` for database migration
* `jsonwebtoken` for working with JWTs
* `dotenv` for managing environment variables
* `bcrypt` for password encryption
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
`create database store;`
- create store_test database for test env
`create database store_test;`

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
* test scripts can be run using `yarn test` or `npm run test`. The script first builds the project and then leverages jasmine for running tests with generated .js files.







