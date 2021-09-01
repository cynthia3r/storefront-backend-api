import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './handlers/order';
import productRoutes from './handlers/product';
import userRoutes from './handlers/user';
import orderProductRoutes from './handlers/order_product';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
  res.send('express server started');
});

orderRoutes(app);
productRoutes(app);
userRoutes(app);
orderProductRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
