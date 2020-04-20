// add this file to .gitignore

module.exports = {
    google: {
        clientID: '274483288325-8lm5aam4co15jskvak57q2ni7k1e4tqb.apps.googleusercontent.com',
        clientSecret: '1LHc7hG0nCys5jyWAadhE5BO',
    },
    facebook: {
        clientID: '534445027213769',
        clientSecret: '239e9b0c49d4ed04ff45b55d792c5f91',
    },
    mongoDB: {
        dbURI: 'mongodb://admin:admin@cluster0-shard-00-00-ndsy5.mongodb.net:27017,cluster0-shard-00-01-ndsy5.mongodb.net:27017,cluster0-shard-00-02-ndsy5.mongodb.net:27017/delit?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
    },
    session: {
        cookieKey: 'awesomeappdelitrevisedfromtiled'
    },
    url: {
        client: process.env.NODE_ENV === 'production' ? 'https://delit.herokuapp.com' : 'http://localhost:3000',
        server: process.env.NODE_ENV === 'production' ? 'https://delit.herokuapp.com' : 'http://localhost:5000',
    }
};