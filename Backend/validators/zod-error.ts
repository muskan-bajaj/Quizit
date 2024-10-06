import { ZodError } from "zod";

export function zodParse(error: any) {
  if (error instanceof ZodError) {
    const errorMessages = error.errors.map((issue: any) => ({
      message: `${issue.path.join(".")} is ${issue.message}`,
    }));
    return errorMessages;
  } else {
    return error;
  }
}
