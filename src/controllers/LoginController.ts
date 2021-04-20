import { NextFunction, Request, Response } from "express";
import { get, controller, bodyValidator, post } from "./decorators";

@controller(`/auth`)
export class LoginController {
  @get(`/login`)
  getLogin(req: Request, res: Response): void {
    res.send(`
  <form method="post">
  <div>
      <label>Email</label>
      <input type="email" name="email"/>
  </div>
  <div>
      <label>Password</label>
      <input type="password" name="password"/>
  </div>
  <button>Submit</button>
  </form>
  `);
  }

  @post(`/login`)
  @bodyValidator(`email`, `password`)
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    if (email && password && email === `hi@hi.com` && password === `password`) {
      req.session = { loggedIn: true };
      res.redirect(`/home`);
    } else {
      return res.send(`Invalid email or password.`);
    }
  }

  @get(`/logout`)
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect(`/home`);
  }
}
