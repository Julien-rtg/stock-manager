import express from "express";
import { AuthRouter } from "./routes/auth.router.ts";
import { ProductRouter } from "./routes/product.router.ts";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const authRouter = new AuthRouter();
const productRouter = new ProductRouter();

app.use('/api/auth', authRouter.getRouter());
app.use('/api/products', productRouter.getRouter());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


