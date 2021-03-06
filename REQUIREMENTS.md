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

#### Users
- Index route [token required]: '/users' [GET]
- Show route [token required]: '/users/:id' [GET]
- Create: '/users' [POST]
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
- [OPTIONAL] Completed Orders by user (args: user id)[token required]: `'/orders/completed/:user_id' [GET]

## Database Schema

`CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    price INTEGER NOT NULL
);`

`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(64) NOT NULL,
    lastname VARCHAR(64) NOT NULL,
    password VARCHAR
);`

`CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR,
    user_id INTEGER,
    CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
);`

`CREATE TABLE order_products (
    order_id INTEGER,
    CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    product_id INTEGER,
    CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id),
    quantity INTEGER
);`

## Data Shapes
#### Product
- id: number
- name: string
- price: number
#### User
- id: number
- firstName: string
- lastName: string
- password: string

#### Order
- order_id (id of the order): number
- product_id (id of each product in the order) : number
- quantity (quantity of each product in the order): number
- user_id: string
- status of order (active or complete): string



