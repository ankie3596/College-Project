const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const db = require('../config/database');

const secret = '1234';
module.exports = function(passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = secret;

    // console.log('PAYLOAD');

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // console.log('Payload', jwt_payload);
        // console.log('Payload', jwt_payload.user_id);

        User.getUserByUserid(jwt_payload.user_id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                // console.log("if statement", user);
                return done(null, user);
            } else {
                // console.log(user);
                return done(null, false);
            }
        });
    }));
}