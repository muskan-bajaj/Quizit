import { Request, Response, NextFunction } from "express";
import { InvalidUserException } from "../customException";

export function has_role(role: Array<string>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.locals.user && role.some((e) => e === req.locals.user.role)) {
      return next();
    } else {
      next(new InvalidUserException());
    }
  };
}
