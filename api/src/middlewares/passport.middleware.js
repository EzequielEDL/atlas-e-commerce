const server = require("express").Router();
const passport = require("passport");
const PassportLocal = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { User } = require("../database/db.js");
const bcrypt = require("bcrypt");

server.use(passport.initialize());
server.use(passport.session());

passport.use(
  new PassportLocal(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ where: { email: email } })
        .then((user) => {
          if (user) {
            const passwordIsRight = bcrypt.compareSync(password, user.password);
            if (passwordIsRight) {
              return done(null, user);
            } else {
              return done(null, false, { msg: "Password invalid" });
            }
          } else {
            return done(null, false, { msg: "Email invalid" });
          }
        })
        .catch((err) => {
          return done(err, false);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "U!D04d02jR%@qmM6FNSg",
    },
    function (payload, done) {
      done(null, payload);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id).then((user) => {
    done(null, user);
  });
});

module.exports = { passport, server };
