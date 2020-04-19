const router = require('express').Router();
const passport = require('passport');
const keys = require('../config/keys');

const googleAuth = passport.authenticate('google', { scope: ['profile'] })
const facebookAuth = passport.authenticate('facebook')

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

router.get('/current_user', (req, res) => {
    res.send(req.user)
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect(`${keys.url.client}`)
});

// auth with google+
router.get('/google', googleAuth);

router.get('/google/redirect', googleAuth, (req, res) => {
    res.redirect(`${keys.url.client}/dashboard`)
});

router.get('/facebook', facebookAuth);

router.get('/facebook/redirect', facebookAuth, (req, res) => {
    // console.log(req.user)
    res.redirect(`${keys.url.client}/dashboard`)
});

module.exports = router;
