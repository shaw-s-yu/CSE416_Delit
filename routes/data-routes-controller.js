const Image = require('../models/mongo-image')


exports.imageCallback = (req, res) => {
    const { imageId } = req.query
    if (!imageId)
        res.send({ err: true, msg: 'imageId undefined' });
    Image.findOne({ _id: imageId }).then(currentImage => {
        if (currentImage) {
            res.send({ err: false, msg: null, data: currentImage.data })
        }
        else
            res.send({ err: true, msg: 'image not found' })
    })

}