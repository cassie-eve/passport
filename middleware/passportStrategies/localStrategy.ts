import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';
import { User } from '../../models/userModel';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const result = getUserByEmailIdAndPassword(email, password);
    if (result.success) {
      return done(null, result.user);
    } else {
      return done(null, false, {
        message: result.message,
      });
    }
  }
);

passport.serializeUser(function (user: any, done: (err: any, id?: number) => void) {
  done(null, user.id);
});

passport.deserializeUser(function (id: number, done: (err: any, user?: any) => void) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
