const router = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('https://real-delit.web.app')
    }
    else {
        next();
    }
}


router.get('/', authCheck, (req, res) => {
    res.send('you are logged in, this is your profile-' + req.user.username)
    res.redirect('https://real-delit.web.app/dashboard')
})

module.exports = router;