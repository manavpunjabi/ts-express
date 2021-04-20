import express, { Request, Response } from "express";
import cookieSession from "cookie-session";
import { AppRouter } from "./AppRouter";
import "./controllers/LoginController";
import "./controllers/RootController";
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieSession({ keys: [`asdas`] }));

app.get(`/`, (req: Request, res: Response) =>
  res.send(`
  <div>
  <h1>Hi there!</h1>
  </div>
  `)
);

app.use(AppRouter.getInstance());
const PORT = 2233;

app.listen(PORT, () => console.log(`Server running on PORT:${PORT}`));
