const app = require('express')();
const passport = require("passport");
const passportJWT = require("passport-jwt");
const {users} = require('./models');
const bodyParser = require('body-parser');
const cors = require('cors');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOpt = {};

jwtOpt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOpt.secretOrKey = 'secret';

const strategy = new JwtStrategy(jwtOpt, (jwt_payload, done) => {
    users.findById(jwt_payload._id)
        .then(user => user ? done(null, user) : done(null, false))
        .catch(err => console.log(err));
})
passport.use(strategy);
app.use(passport.initialize());
app.use(cors());
app.use(bodyParser.json());

module.exports = {passport};