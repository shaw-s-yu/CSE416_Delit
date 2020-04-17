const app = require('express')()
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport')
const cors = require("cors");
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const session = require('express-session')

app.set('io', io);

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

// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
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

server.listen(process.env.PORT || 5000)