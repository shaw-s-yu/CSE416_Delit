export default class CopyController {
    constructor(startGrids) {
        this.startGrids = JSON.parse(JSON.stringify(startGrids))
    }

    pastGrids = (position) => {
        console.log(position)
    }

    getStartGrids = () => {
        return this.startGrids
    }
}