const Image = require('../models/mongo-image')


exports.imageCallback = (req, res) => {
    const { imageId } = req.query
    if (!imageId)
        res.send({ err: true, msg: 'imageId undefined' });
    Image.findOne({ _id: imageId }).then(currentImage => {
        if (currentImage) {
            if (currentImage.data)
                res.send({ err: false, msg: null, data: currentImage.data })
            else {
                Image.findOne({ _id: '5eacb076d0ed064dec138c41' }).then(newImage => {
                    if (!newImage) throw new Error('find image fail')
                    res.send({ err: false, msg: null, data: newImage.data })
                })
            }
        }
        else
            res.send({ err: true, msg: 'image not found' })
    })

}