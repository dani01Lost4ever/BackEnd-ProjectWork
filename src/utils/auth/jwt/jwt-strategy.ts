import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { BankAccount as BankAccountModel } from "../../../api/bank-account/bank-account.model";

export const JWT_SECRET = "secret";

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (token, done) => {
      try {
        console.log(token);
        const bankaccount = await BankAccountModel.findById(token.id);
        if (bankaccount) {
          return done(null, bankaccount.toObject());
        } else {
          return done(null, false, { message: "invalid token" });
        }
      } catch (err) {
        done(err);
      }
    }
  )
);
