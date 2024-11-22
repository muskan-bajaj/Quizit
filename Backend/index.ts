import { config } from "dotenv";
config();

import cookieParser from "cookie-parser";
import morgan from "morgan";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import * as routes from "./routes";
import {
  InvalidUserException,
  InvalidDataException,
  exceptionHandler,
} from "./customException";
import { CustomLogger } from "./logger";
import moment from "moment-timezone";
import { Mailer } from "./utils/mailer";
import Mail from "nodemailer/lib/mailer";

const app = express();
const logger = new CustomLogger();

moment.tz.setDefault("Asia/Kolkata");

app.use(
  cors({
    origin: "http://localhost:5173", // React frontend URL
    credentials: true, // Allow credentials (cookies)
  })
);

app.use(express.json());
app.use(morgan("dev")); //request logger
app.use(cookieParser());
app.use((req, res, next) => {
  req.locals = {};
  req.validateData = {};
  return next();
}); //initialize req variables

app.use("/auth", routes.userRoutes);
app.use("/test", routes.testRoute);

app.use(exceptionHandler);
app.use("*/*", (req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(process.env.PORT, () => {
  logger.log("Server is running on port", process.env.PORT);
});
