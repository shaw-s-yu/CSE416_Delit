const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');
const User = require('../models/mongo-user')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: 'http://localhost:5000/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {

        // check if user already exists in our db
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                console.log('user is: ', currentUser)
                currentUser.username = profile.displayName
                currentUser.googleId = profile.id
                currentUser.picture = profile._json.picture
                currentUser.save().then((e) => {
                    done(null, currentUser)
                })

            }
            else {
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    picture: profile._json.picture,
                }).save().then((newUser) => {
                    done(null, newUser)
                })

            }
        })
    })
);

passport.use(
    new FacebookStrategy({
        clientID: keys.facebook.clientID,
        clientSecret: keys.google.clientID,
        callbackURL: 'http://localhost:3000/dashboard'
    }, () => {

    })
);