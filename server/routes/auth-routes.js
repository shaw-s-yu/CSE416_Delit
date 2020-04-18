const router = require('express').Router();
const passport = require('passport');

const googleAuth = passport.authenticate('google', { scope: ['profile'] })

//router sets socketid
router.use((req, res, next) => {
    if (req.query.socketId !== undefined)
        req.session.socketId = req.query.socketId
    next()
})

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

router.get('/current_user', (req, res) => {
    const io = req.app.get('io')
    const id = req.session.socketId;
    if (req.user)
        io.in(id).emit('google', { err: false, msg: null, auth: req.user })
    else
        io.in(id).emit('google', { err: true, msg: 'no log in', auth: null })
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();
    res.redirect('http://localhost:3000')
});

// auth with google+
router.get('/google', googleAuth);

router.get('/google/redirect', googleAuth, (req, res) => {
    const io = req.app.get('io')
    const id = req.session.socketId;
    io.in(id).emit('google', { err: false, msg: null, auth: req.user })
    res.end()
});

router.get('/facebook', passport.authenticate('facebook'));

module.exports = router;
