import express from "express";
import cors from "cors";
import morgan from "morgan";
import apiRouter from "./api/routes";
import bodyParser from "body-parser";
import { errorHandler } from "./errors";
import { notFoundHandler } from "./errors/not-found";
import { validationErrorHandler } from "./errors/validationError";
import "./utils/auth/auth.handler";
import { transactionHandler } from "./errors/transaction-errors";
import { userHandler } from "./errors/user-errors";
import { transactionResearchHandler } from "./errors/transactionResearch-error";
import { bankAccountHandler } from "./errors/bank-account-exist";
const app = express();

app.set('trust proxy', true);
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

app.use("/api", apiRouter);

app.use(transactionResearchHandler);
app.use(userHandler);
app.use(notFoundHandler);
app.use(bankAccountHandler);
app.use(transactionHandler);
app.use(validationErrorHandler);
app.use(errorHandler);

export default app;
