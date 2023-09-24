import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { BankAccountIdentity } from "./bank-account-identity.model";
import * as bcrypt from "bcrypt";

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    async (username, password, done) => {
      try {
        const identity = await BankAccountIdentity.findOne({
          "credentials.username": username,
        });
        if (!identity) {
          return done(null, false, {
            message: `username ${username} not found`,
          });
        }
        const match = await bcrypt.compare(
          password,
          identity.credentials.hashedPassword
        );
        // vado a convertirlo in oggetto semplice per eliminare i metodi di mongoose
        const plainUser = identity.toObject().user;
        if (match) {
          return done(null, plainUser);
        }
        done(null, false, { message: "invalid password" });
      } catch (err) {
        done(err);
      }
    }
  )
);
