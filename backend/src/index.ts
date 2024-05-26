import express from "express";
import { AuthRouter } from "./routes/auth.router.ts";
import { ProductRouter } from "./routes/product.router.ts";

const app = express();
const port = 3000;

app.use(express.json());

const authRouter = new AuthRouter();
const productRouter = new ProductRouter();

app.use('/api/auth', authRouter.getRouter());
app.use('/api/product', productRouter.getRouter());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


