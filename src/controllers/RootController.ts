import { NextFunction, Request, Response } from "express";
import { get, controller, bodyValidator, post, use } from "./decorators";

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req?.session?.loggedIn) {
    next();
    return;
  }
  res.status(403).send(`Not Permitted`);
};

@controller(``)
export class RootController {
  @get(`/`)
  getRoot(req: Request, res: Response) {
    if (req?.session?.loggedIn) {
      res.send(`
       <div>
       <div>
       You are logged in
       </div>
       <a href="/auth/logout">Logout</a>
       </div>
       `);
    } else {
      res.send(`
        <div>
        <div>
        You are not logged in.
        </div>
        <a href="/auth/login">Login</a>
        </div>
        `);
    }
  }

  @get(`/protected`)
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send(`Welcome to protected route, logged in user.`);
  }
}