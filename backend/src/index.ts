import express from "express";
import { AuthRouter } from "./routes/auth.router.ts";
import { ProductRouter } from "./routes/product.router.ts";
import { StockChangeRouter } from "./routes/stock-change.router.ts";
import cors from "cors";
import { OrderRouter } from "./routes/order.router.ts";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const authRouter = new AuthRouter();
const productRouter = new ProductRouter();
const stockChangeRouter = new StockChangeRouter();
const orderRouter = new OrderRouter();

app.use('/api/auth', authRouter.getRouter());
app.use('/api/products', productRouter.getRouter());
app.use('/api/stock-change', stockChangeRouter.getRouter());
app.use('/api/orders', orderRouter.getRouter());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


