const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config');

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: `${keys.url.server}/auth/google/redirect`
    }, (accessToken, refreshToken, profile, done) => {
        const { id } = profile
        const picture = profile.photos[0].value.replace(/_normal/, '')
        const user = { id, picture, provider: 'google' }
        done(null, user)
    })
);

passport.use(
    new FacebookStrategy({
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: `${keys.url.server}/auth/facebook/redirect`,
        profileFields: ['id', 'picture.width(250)'],
    }, (accessToken, refreshToken, profile, done) => {
        const { id } = profile
        const picture = profile.photos[0].value
        const user = { id, picture, provider: 'facebook' }
        done(null, user)
    })
);