const app = require('express')()
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport')
const cors = require("cors");

app.use(
    cors({
        origin: "http://localhost:3000", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    })
);

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(keys.mongoDB.dbURI, () => {
    console.log('connected to mongodb');
});

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
// app.get('/hi', (req, res) => {
//     res.send({ hi: 'hi' })
// })


app.listen(process.env.PORT || 5000)