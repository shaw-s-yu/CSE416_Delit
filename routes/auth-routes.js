const router = require('express').Router();
const authController = require('./auth-routes-controller')

const {
    sessionSaver,
    googleAuth,
    facebookAuth,
    currentCallback,
    initCallback,
    logoutCallback,
    authCallback,
} = authController

router.use(sessionSaver)

router.get('/current', currentCallback);

router.get('/init', initCallback);

router.get('/logout', logoutCallback);

router.get('/google', googleAuth);

router.get('/google/redirect', googleAuth, authCallback);

router.get('/facebook', facebookAuth);

router.get('/facebook/redirect', facebookAuth, authCallback);

module.exports = router;
