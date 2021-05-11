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

const googleStrategy = new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id })
        if (existingUser) {
            // we already have a user with profile.id
            return done(null, existingUser);
        }

        // we don't have a user with profile.id
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);

    });

if (process.env.NODE_ENV !== 'production') {
    // when push to heroku, remeber to comment these 2 lines
    const agent = new HttpsProxyAgent(process.env.HTTP_PROXY || "http://127.0.0.1:1087");
    googleStrategy._oauth2.setAgent(agent);
}

passport.use(googleStrategy);