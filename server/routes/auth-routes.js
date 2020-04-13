const router = require('express').Router();
const passport = require('passport');

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
    console.log('hi')
    req.logOut();
    res.redirect('http://localhost:3000')
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate("google", {
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: "/auth/login/failed"
}), (req, res) => {
    res.send(req.user)
}

);

router.get('/facebook', passport.authenticate('facebook'));


module.exports = router;
