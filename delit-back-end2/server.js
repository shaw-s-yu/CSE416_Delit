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

        socket.on('register', (data) => {
            let email = data.email;
            let password = data.password;
            let password2 = data.password2;

            if (email === '' || password === '' || password2 === '')
                socket.emit('register_back', 'At least one field has not been filled')
            else if (password !== password2)
                socket.emit('register_back', 'Password doesn\'t match')
            else {
                user.insert({
                    email: email,
                    password: password
                }, () => {
                    client.emit("register_back", 'COMPLETE');

                })
            }
        })
    });


});