# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index route: '/products' [GET]
- Show route: '/products/:id' [GET]
- Create route [token required]: '/products' [POST]
- Update route [token required]: '/products/:id' [PUT]
- Delete route [token required]: '/products/:id' [DELETE]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index route [token required]: '/users' [GET]
- Show route [token required]: '/users/:id' [GET]
- Create [token required]: '/users' [POST]
- Update route [token required]: '/users/:id' [PUT]
- Delete route [token required]: '/users/:id' [DELETE]
- Login route [for response receive an authentication token]: 'users/login' [POST]

#### Orders
- Index route [token required]: '/orders' [GET]
- Show route [token required]: '/orders/:id' [GET]
- Create [token required]: '/orders' [POST]
- Update route [token required]: '/orders/:id' [PUT]
- Delete route [token required]: '/orders/:id' [DELETE]
- Current Order by user (args: user id)[token required]: '/orders/current/:user_id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Database Schema

`CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price INTEGER NOT NULL
);`

`CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    firstname VARCHAR(64) NOT NULL,
    lastname VARCHAR(64) NOT NULL,
    password VARCHAR
);`

`CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR,
    user_id VARCHAR REFERENCES users(id)
);`

`CREATE TABLE order_products (
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER
);`

## Data Shapes
#### Product
- id: number
- name: string
- price: number
- [OPTIONAL] category
#### User
- id: string
- firstName: string
- lastName: string
- password: string

#### Order
- order_id (id of the order): number
- product_id (id of each product in the order) : number
- quantity (quantity of each product in the order): number
- user_id: string
- status of order (active or complete): string



