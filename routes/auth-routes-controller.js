const passport = require('passport');
const keys = require('../config/keys');
const User = require('../models/mongo-user')

exports.sessionSaver = (req, res, next) => {
    if (req.query.socketId !== undefined)
        req.session.socketId = req.query.socketId
    if (req.query.username !== undefined)
        req.session.username = req.query.username
    next()
}

exports.googleAuth = passport.authenticate('google', { scope: ['profile'] })
exports.facebookAuth = passport.authenticate('facebook')

exports.currentCallback = (req, res) => {
    const { user } = req
    User.findOne({ id: user.id, provider: user.provider }).then(currentUser => {
        res.send(currentUser)
    })
}

exports.initCallback = (req, res) => {
    req.session.socketId = req.query.socketId
    req.session.authEntry = req.query.type
    res.send(req.session.socketId)
}

exports.logoutCallback = (req, res) => {
    req.logout();
    res.redirect(`${keys.url.client}`)
}

exports.authCallback = (req, res) => {
    const { user } = req
    if (req.session.authEntry === 'login') {
        User.findOne({ id: user.id, provider: user.provider }).then(currentUser => {
            const io = req.app.get('io')
            const id = req.session.socketId;
            if (currentUser) {
                console.log(id)
                currentUser.googleId = user.id
                currentUser.picture = user.picture
                currentUser.save().then((e) => {
                    io.in(id).emit('authBack', { err: false, msg: null, auth: currentUser })
                })
            }
            else {
                io.in(id).emit('authBack', {
                    err: true,
                    msg: 'Account Not Exist, Please Sign Up',
                    auth: null
                })
            }
            res.end()
        })
    } else if (req.session.authEntry === 'register') {
        const { username } = req.session
        User.findOne({ id: user.id, provider: user.provider }).then(currentUser => {
            const io = req.app.get('io')
            const id = req.session.socketId;
            if (currentUser)
                io.in(id).emit('authBack', {
                    err: true,
                    msg: 'Acount Already Exist, Please Sign In',
                    auth: null
                })
            else {
                new User({
                    username: username,
                    id: user.id,
                    picture: user.picture,
                    provider: user.provider
                }).save().then((newUser) => {
                    io.in(id).emit('authBack', { err: false, msg: null, auth: newUser })
                })
            }
            res.end()
        })
    }
}