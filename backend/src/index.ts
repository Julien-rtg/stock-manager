import express from "express";
import { AuthRouter } from "./routes/auth.router";

const app = express();
const port = 3000;

app.use(express.json());

const authRouter = new AuthRouter();

app.use('/api/auth', authRouter.getRouter());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


