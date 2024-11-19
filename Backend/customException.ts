import { NextFunction, Request, Response } from "express";

export class InvalidUserException extends Error {
  constructor(message: string = "Unauthorized") {
    super(message);
  }
}

export class InvalidDataException extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class DataAleadryExistsException extends Error {
  constructor(message: string = "") {
    super(message);
  }
}

export class ValidationError extends Error {
  constructor(message: Object) {
    super(JSON.stringify(message));
  }
}

export function exceptionHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof InvalidUserException) {
    res.status(401).send(err.message);
    return;
  }
  if (err instanceof InvalidDataException) {
    res.status(400).send(err.message);
    return;
  }
  if (err instanceof ValidationError) {
    res.status(422).json(JSON.parse(err.message));
    return;
  }
  if (err instanceof DataAleadryExistsException) {
    res.status(200).send(err.message);
    return;
  }

  res.status(500).send(err.message ?? "Something broke!");
}
