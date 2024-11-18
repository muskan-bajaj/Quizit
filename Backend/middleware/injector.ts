import { Request, Response, NextFunction } from "express";
import { getDbInstance } from "../drizzle/db";
import * as schema from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { InvalidUserException } from "../customException";
const db = getDbInstance();

export async function user(req: Request, res: Response, next: NextFunction) {
  var uid = req.locals.uid;
  if (uid) {
    var userObj = await db
      .select()
      .from(schema.user)
      .where(eq(schema.user.uid, uid));

    if (user.length !== 0) req.locals.user = userObj[0];
    return next();
  } else {
    next(new InvalidUserException());
  }
}
