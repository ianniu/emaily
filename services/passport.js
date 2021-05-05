const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const HttpsProxyAgent = require('https-proxy-agent');
const mongoose = require('mongoose');

// pull users model from mongoose
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    // user_id is a MongoDB unique identifier
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

const googleStrategy = new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
        .then((existingUser) => {
            if (existingUser) {
                // we already have a user with profile.id
                console.log('already has this user!')
                done(null, existingUser);
            } else {
                // we don't have a user with profile.id
                console.log('creating a new user!')
                new User({ googleId: profile.id }).save()
                    .then(user => done(null, user));
            }
        })
});

const agent = new HttpsProxyAgent(process.env.HTTP_PROXY || "http://127.0.0.1:1087");
googleStrategy._oauth2.setAgent(agent);

passport.use(googleStrategy);