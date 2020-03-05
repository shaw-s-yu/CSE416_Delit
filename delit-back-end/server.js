const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(process.env.PORT || 5000).sockets;

// Connect to mongo
mongo.connect('mongodb://admin:admin@cluster0-shard-00-00-ndsy5.mongodb.net:27017,cluster0-shard-00-01-ndsy5.mongodb.net:27017,cluster0-shard-00-02-ndsy5.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', function (err, db) {
    if (err) {
        throw err;
    }

    console.log('MongoDB connected...');
    // Connect to Socket.io
    client.on('connection', (socket) => {
        let user = db.db('delit').collection('users');
        console.log(user)

        socket.on('register_input', (data, callback) => {
            let emailWithCase = data.email;
            let email = emailWithCase.toLowerCase();
            let password = data.password;
            let password2 = data.password2;

            if (email === '' || password === '' || password2 === '')
                callback(true, 'At least one field has not been filled')
            else if (password !== password2)
                callback(true, 'Password doesn\'t match')
            else if (password.length < 1)
                callback(true, 'Invalid password, too short')
            else {
                user.find({ email: email }).toArray((err, res) => {
                    console.log(res[0])
                    if (res[0])
                        callback(true, 'This email already registered');
                    else
                        user.insert({
                            email: email,
                            password: password
                        }, () => {
                            callback(false, email)
                        })
                })
            }
        });

        socket.on('login_input', (data, callback) => {
            let emailWithCase = data.email;
            let email = emailWithCase.toLowerCase();
            let password = data.password;

            if (email === '' || password === '')
                callback(true, 'At least one field has not been filled')
            else {
                user.find({ email: email }).toArray((err, res) => {
                    console.log(res[0])
                    if (!res[0] || res[0].password !== password)
                        callback(true, 'email/password doesn\'t match');
                    else
                        callback(false, email)
                })

            }
        });
    });


});