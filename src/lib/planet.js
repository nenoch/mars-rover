import { getRandomInt } from './utils'

export class Planet {
    constructor() {
        this.maxX = 100
        this.maxY = 100
        this.maxObs = 4
        this.obstacles = this.setObstacles([])
    }

    // private
    setObstacles(array) {
        for (var i = 0; i < getRandomInt(this.maxObs); i++) array.push(this.generateObstacle())
        return array;
    }

    // private
    generateObstacle() {
        return { x: getRandomInt(this.maxX), y: getRandomInt(this.maxY) }
    }

    getObstacles() {
        return this.obstacles
    }

    getGrid() {
        return { maxX: this.maxX, maxY: this.maxY }
    }
}