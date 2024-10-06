import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { zodParse } from "./zod-error";

const login = z.object({
  username: z.string(),
  password: z.string(),
});

const providerLogin = z.object({
  token: z.string(),
  provider: z.string(),
});

const register = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  rollno: z.number(),
});

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = login.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json(zodParse(err));
  }
}

export function validateProviderLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.body = providerLogin.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json(zodParse(err));
  }
}

export function validateRegister(req: Request, res: Response, next: NextFunction) {
  try {
    req.body = register.parse(req.body);
    next();
  } catch (err) {
    res.status(400).json(zodParse(err));
  }
}