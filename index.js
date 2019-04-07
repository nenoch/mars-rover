import { applyMove, getRandomInt } from './utils'

export class Planet {
    constructor() {
        this.maxX = 100;
        this.maxY = 100;
        this.maxObs = 4;
        this.obstacles = this.setObstacles([]);
    }

    // private
    setObstacles(array) {
        for (var i = 0; i < getRandomInt(this.maxObs); i++) array.push(this.generateObstacle());
        return array;
    }

    // private
    generateObstacle() {
        return { x: getRandomInt(this.maxX), y: getRandomInt(this.maxY) }
    }

    getObstacles() {
        return this.obstacles;
    }

    getGrid() {
        return { maxX: this.maxX, maxY: this.maxY };
    }
}

export class Rover {
    constructor(planet) {
        this.position = { x: 0, y: 0, d: 'N' };
        this.planet = planet;
    }

    getPosition() {
        return this.position;
    }

    setPosition(instructions) {
        let response = this.position;
        [...instructions].some(m => {
            this.applyMove(m, this.position);
            if (this.reachObstacle(this.planet.getObstacles(), this.position)) {
                response = {
                    errorMsg: `Obstacle detected at ${JSON.stringify(this.position)}. Abort sequence.`
                }
                return true
            };
            this.position = this.accountForSphere(this.position, this.planet.getGrid());
        })
        return response;
    }

    // private
    reachObstacle(obstacles, position) {
        for (let obs of obstacles) {
            return (obs.x === position.x && obs.y === position.y);
        }
    }

    // private
    accountForSphere(position, grid) {
        if (position.x < 0) { position.x = grid.maxX + position.x }
        if (position.y < 0) { position.y = grid.maxY + position.y }
        if (position.x > grid.maxX) { position.x = position.x - grid.maxX }
        if (position.y > grid.maxY) { position.y = position.y - grid.maxY }
        return position;
    }

    // private
    applyMove(move, currentPosition) {
        return ({
            N: (move) => ({
                F: (currentPosition) => {
                    return { x: currentPosition.x, y: ++currentPosition.y, d: currentPosition.d }
                },
                B: (currentPosition) => {
                    return { x: currentPosition.x, y: --currentPosition.y, d: currentPosition.d = 'S' }
                },
                R: (currentPosition) => {
                    return { x: ++currentPosition.x, y: currentPosition.y, d: currentPosition.d = 'E' }
                },
                L: (currentPosition) => {
                    return { x: --currentPosition.x, y: currentPosition.y, d: currentPosition.d = 'W' }
                },
            })[move](currentPosition),
            S: (move) => ({
                F: (currentPosition) => {
                    return { x: currentPosition.x, y: --currentPosition.y, d: currentPosition.d }
                },
                B: (currentPosition) => {
                    return { x: currentPosition.x, y: ++currentPosition.y, d: currentPosition.d = 'N' }
                },
                R: (currentPosition) => {
                    return { x: --currentPosition.x, y: currentPosition.y, d: currentPosition.d = 'W' }
                },
                L: (currentPosition) => {
                    return { x: ++currentPosition.x, y: currentPosition.y, d: currentPosition.d = 'E' }
                },
            })[move](currentPosition),
            E: (move) => ({
                F: (currentPosition) => {
                    return { x: ++currentPosition.x, y: currentPosition.y, d: currentPosition.d }
                },
                B: (currentPosition) => {
                    return { x: --currentPosition.x, y: currentPosition.y++, d: currentPosition.d = 'W' }
                },
                R: (currentPosition) => {
                    return { x: currentPosition.x, y: --currentPosition.y, d: currentPosition.d = 'S' }
                },
                L: (currentPosition) => {
                    return { x: currentPosition.x, y: ++currentPosition.y, d: currentPosition.d = 'N' }
                },
            })[move](currentPosition),
            W: (move) => ({
                F: (currentPosition) => {
                    return { x: --currentPosition.x, y: currentPosition.y, d: currentPosition.d }
                },
                B: (currentPosition) => {
                    return { x: ++currentPosition.x, y: currentPosition.y, d: currentPosition.d = 'E' }
                },
                R: (currentPosition) => {
                    return { x: currentPosition.x, y: ++currentPosition.y, d: currentPosition.d = 'N' }
                },
                L: (currentPosition) => {
                    return { x: currentPosition.x, y: --currentPosition.y, d: currentPosition.d = 'S' }
                },
            })[move](currentPosition)
        })[currentPosition.d](move);
    }
}

export class Mission {
    constructor() {
        this.planet = new Planet();
        this.rover = new Rover(this.planet);
    }
}

// let mission;

// function startMission() {
//     mission = new Mission()
// }

// startMission()
// console.log('mission.rover.setPosition >>', mission.rover.setPosition('FFRFFFF'));
// console.log('planet obs >>', mission.planet.obstacles);
// console.log('getPosition >>', mission.rover.getPosition());