const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');
const User = require('../models/mongo-user')

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
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our db
        User.findOne({ id: profile.id, provider: 'google' }).then((currentUser) => {
            const { displayName, id } = profile
            const picture = profile.photos[0].value.replace(/_normal/, '')
            if (currentUser) {
                currentUser.username = displayName
                currentUser.id = id
                currentUser.picture = picture
                currentUser.save().then((e) => {
                    done(null, currentUser)
                })
            }
            else {
                new User({
                    username: displayName,
                    id: id,
                    picture: picture,
                    provider: 'google'
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
        clientSecret: keys.facebook.clientSecret,
        callbackURL: '/auth/facebook/redirect',
        profileFields: ['id', 'email', 'name', 'picture.width(250)'],
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our db
        User.findOne({ id: profile.id, provider: 'facebook' }).then((currentUser) => {
            const { familyName, givenName } = profile.name
            const { id } = profile
            const picture = profile.photos[0].value
            if (currentUser) {
                currentUser.username = `${givenName} ${familyName}`
                currentUser.id = id
                currentUser.picture = picture
                currentUser.save().then((e) => {
                    done(null, currentUser)
                })
            }
            else {
                new User({
                    username: `${givenName} ${familyName}`,
                    id: id,
                    picture: picture,
                    provider: 'facebook'
                }).save().then((newUser) => {
                    done(null, newUser)
                })

            }
        })
    })
);