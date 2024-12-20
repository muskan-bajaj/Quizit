import { NextFunction, Request, Response } from "express";
import * as type from "./interface/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ConfigSingleton } from "../utils/config";
import { getDbInstance } from "../drizzle/db";
import * as schema from "../drizzle/schema";
import { eq, or } from "drizzle-orm";
import { CustomLogger } from "../logger";
import { Mailer } from "../utils/mailer";
import { Mnemonic } from "../utils/mnemonic";
import { InvalidDataException, InvalidUserException } from "../customException";
const logger = new CustomLogger();
const config = ConfigSingleton.getInstance();
const db = getDbInstance();
const prod = (process.env.NODE_ENV ?? "dev") == "prod";
const mailer = Mailer.getInstance();
const mnemonic = new Mnemonic(32);

export async function login(req: Request, res: Response, next: NextFunction) {
  const data: type.login = req.body;

  var userOb = await db
    .select()
    .from(schema.user)
    .where(eq(schema.user.username, data.username));

  if (userOb.length === 0) {
    next(new InvalidUserException("Invalid Credentials"));
    return;
  }
  var user = userOb[0];

  var salt = user.salt;
  var is_valid = await bcrypt.compare(data.password, user.password!);
  if (is_valid) {
    var token = await jwt.sign({ uid: user.uid }, process.env.JWT_SECRET!, {
      expiresIn: "5d",
      issuer: "quizit",
    });

    var cookie_options: {
      maxAge: number;
      httpOnly: boolean;
      sameSite?: "none" | "lax" | "strict";
      secure?: boolean;
    } = {
      maxAge: 1000 * 60 * 60 * 24 * 5,
      httpOnly: true,
    };

    if (prod) {
      cookie_options["sameSite"] = "none";
      cookie_options["secure"] = true;
    }
    res.cookie("auth_token", token, cookie_options); // expires in 5 days

    res.status(200).json({
      user: {
        name: user.name,
        email: user.username,
        role: user.role,
        provider: user.provider,
        rollno: user.rollno,
      },
    });
    return;
  }

  next(new InvalidUserException("Invalid Credentials"));
}

export async function providerLogin(req: Request, res: Response) {
  logger.log(req.body);
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data: type.register = req.body;

  var email_domain = data.email.split("@")[1];
  var allowed_domains: Array<String> = config.configRegister
    ? config.getConfig().allowed_email
    : [];
  if (
    allowed_domains &&
    !allowed_domains.some((domain) => domain === email_domain)
  ) {
    next(new InvalidUserException("Email domain not allowed"));
    return;
  }
  var is_teacher = isNaN(Number(data.email.split("@")[0]));
  if (!is_teacher && data.rollno !== Number(data.email.split("@")[0])) {
    next(new InvalidDataException("Rollno and email should be same"));
    return;
  }
  var is_duplicate = await db.$count(
    schema.user,
    or(
      eq(schema.user.username, data.email),
      eq(schema.user.rollno, data.rollno)
    )
  );
  if (is_duplicate !== 0) {
    next(new InvalidUserException("User already exists"));
    return;
  }

  var salt = bcrypt.genSaltSync(10);
  const password = mnemonic.toWords().join("");
  var hash = bcrypt.hashSync(password, salt);
  var user = await db
    .insert(schema.user)
    .values({
      username: data.email,
      password: hash,
      name: data.name,
      rollno: data.rollno,
      salt: salt,
      provider: "Email",
      role: is_teacher ? "Teacher" : "Student",
    })
    .returning();

  mailer.sendMail(
    [data.email],
    "Welcome to Quizit",
    `Hi, ${data.email} Your password is ${password}`
  );
  res.json({ uid: user[0].uid });
}

export async function validate(req: Request, res: Response) {
  if (!req.locals.uid) {
    res.status(401);
  }
  var user = req.locals.user;
  if (user) {
    res.json({
      user: {
        name: user.name,
        email: user.username,
        role: user.role,
        provider: user.provider,
        rollno: user.rollno,
      },
    });
    return;
  }
  res.status(401).json({ error: "Invalid User" });
}
