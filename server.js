require('dotenv').config()
const express = require('express')
const app = express()
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config');
const cookieSession = require('cookie-session');
const passport = require('passport')
const cors = require("cors");
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const session = require('express-session')
const bodyParser = require("body-parser");
const path = require('path');
const expressGraphql = require('express-graphql');
const User = require('./models/mongo-user')

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
app.unsubscribe(bodyParser.urlencoded({ extended: false }))

io.on('connection', socket => {
    socket.on('username_register', data => {
        if (data.length < 6)
            socket.emit('username_register_back', { err: true, msg: 'At Least 6 Letters' })
        else
            User.findOne({ username: data }).then(user => {
                if (user)
                    socket.emit('username_register_back', { err: true, msg: 'Username Already Existed' })
                else
                    socket.emit('username_register_back', { err: false, msg: 'Good' })
            })
    })

    socket.on('draw', data => {
        io.emit('drawBack', data)
    })
})

app.set('io', io);

app.use(
    cors({
        origin: "*", // allow to server to accept request from different origin
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

const schema = require('./schema/Schema');
app.use('/graphql', expressGraphql({
    schema,
    graphiql: true
}));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

server.listen(process.env.PORT || 5000)