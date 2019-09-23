const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

exports.authenticate = passport => {
  //configure passport-local
  passport.use(
    new LocalStrategy(
      {usernameField: 'email', passwordField: 'password'},
      async (email, password, done) => {
        try {
          const user = await User.findOne({email});

          /*no user found*/
          if (!user) {
            return done(null, false);
          }

          /*user found. verify password*/
          const result = await bcrypt.compare(password, user.password);

          /*incorrect password*/
          if (!result) {
            return done(null, false);
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  //configure passport-JWT
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        const user = await User.findOne({_id: jwt_payload.id});

        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    })
  );
}; //end-authenticate
