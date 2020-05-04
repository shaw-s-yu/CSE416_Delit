export default class CopyController {
    constructor(startGrids, startImgData) {
        this.startGrids = JSON.parse(JSON.stringify(startGrids))
        this.startImgData = startImgData
    }

    pastGrids = (position) => {
        console.log(position)
    }

    getStartGrids = () => {
        return this.startGrids
    }

    getStartImageData = () => {
        return this.startImgData
    }
}