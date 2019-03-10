const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users') //ne koristi se require zbog mogucih gresaka prilikom testiranja
const keys = require('../config/keys')
const passport = require('passport')
require('../models/GoogleUsers')
const GoogleUser = mongoose.model('googleusers')

//GoogleOauth2.0
passport.serializeUser((user, done)=> {
    done(null, user.id)
})
passport.deserializeUser((id, done)=> {
    GoogleUser.findById(id)
        .then(user => done(null, user))
})

//JWT Token
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    //User with that id find
                    return done(null, user)
                }
                return done(null, false);
            })
            .catch(err => console.log(err)
            )
    }));
    passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleSecret,
        callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) =>  {
       
        GoogleUser.findOne({googleId : profile.id})
            .then(existingUser => {
                if (existingUser) {
                    done(null , existingUser)
                }else{
                    new GoogleUser({
                        googleId : profile.id,
                        token : accessToken,
                        email : profile.emails[0].value,
                        name : profile.displayName,
                        avatar : profile.photos[0].value
                    }).save()
                        .then(user => done(null, user))
                }
            }) 
    }
    ));
}
