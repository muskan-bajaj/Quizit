import { ZodParsedType, ZodType, ZodTypeAny } from "zod";

declare global {
  namespace Express {
    interface Request {
      locals: Record<string, any>;
      validateData: Record<string, any>;
    }
  }
}

export {};
