import { Planet } from './planet'
export class Rover {
    constructor() {
        this.position = { x: 0, y: 0, d: 'N' };
        this.planet = new Planet();
    }

    getPosition() {
        return this.position;
    }

    setPosition(instructions) {
        let response = this.position;
        [...instructions].some(m => {
            this.applyMove(m, this.position);
            this.position = this.accountForSphere(this.position, this.planet.getGrid());
            if (this.reachObstacle(this.planet.getObstacles(), this.position)) {
                response = this.addErrorMsg(response, this.position)
                return true
            }
        })
        return response;
    }

    // private
    returnErrorMsg(position) {
        return {
            errorMsg: `Obstacle detected at ${JSON.stringify(position)}. Abort sequence.`
        }
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