import { NextFunction, Response } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { AddUserDTO, LoginDTO } from "./auth.dto";
import { omit, pick } from "lodash";
import { BankAccountExistsError } from "../../errors/bank-account-exist";
import passport from "passport";
import * as jwt from "jsonwebtoken";
import BankAccountService from "../bank-account/bank-account.service";

const JWT_SECRET = "secret";

export const add = async (
  req: TypedRequest<AddUserDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = omit(req.body, "username", "password");
    const credentials = pick(req.body, "username", "password");
    const newUser = await BankAccountService.add(userData, credentials);
    res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof BankAccountExistsError) {
      res.status(400);
      res.send(err.message);
    } else {
      next(err);
    }
  }
};

export const login = async (
  req: TypedRequest<LoginDTO>,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("local", (err, bankaccount, info) => {
    //console.log("paaport auth");
    if (err) {
      return next(err);
    }
    if (!bankaccount) {
      res.sendStatus(401);
      res.json({
        error: "LoginError",
        code: info.message,
      });
      return;
    }
    //generate token
    const token = jwt.sign(bankaccount, JWT_SECRET, { expiresIn: "7 days" });
    res.status(200);
    res.json({
      user: bankaccount,
      token,
    });
  })(req, res, next);
};
