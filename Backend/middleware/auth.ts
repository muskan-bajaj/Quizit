import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { InvalidUserException } from "../customException";
import { CustomLogger } from "../logger";

const logger = new CustomLogger();
export async function protect(req: Request, res: Response, next: NextFunction) {
  var token = req.cookies.auth_token ?? "";

  try {
    var val: any = await jwt.verify(token, process.env.JWT_SECRET!);
    req.locals.uid = val.uid;
    next();
  } catch (error: any) {
    logger.error("error", error);
    next(new InvalidUserException());
  }
}
