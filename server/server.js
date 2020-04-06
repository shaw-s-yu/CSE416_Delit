const app = require('express')()
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys');

// app.set('view engine', 'ejs');

mongoose.connect(keys.mongoDB.dbURI, () => {
    console.log('connected to mongodb');
});

app.use('/auth', authRoutes)

// app.get('/hi', (req, res) => {
//     res.send({ hi: 'hi' })
// })


app.listen(process.env.PORT || 5000)