const router = require('express').Router();
const dataController = require('./data-routes-controller')

const {
    imageCallback
} = dataController

router.get('/image', imageCallback)

module.exports = router;