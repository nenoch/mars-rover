const applyMove = require('./utils').applyMove;
const getRandomInt = require('./utils').getRandomInt;

class Planet {
    constructor(maxX = 100, maxY = 100, maxObs = 4) {
        this.maxX = maxX;
        this.maxY = maxY;
        this.maxObs = maxObs;
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

class Rover {
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
            applyMove(m, mission.rover.position);
            if (this.isObstacle(this.planet.getObstacles(), this.position)) {
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
    isObstacle(obstacles, position) {
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
}

class Mission {
    constructor() {
        this.planet = new Planet();
        this.rover = new Rover(this.planet);
    }
}

let mission;

function startMission() {
    mission = new Mission()
}

startMission()
console.log('mission.rover.setPosition >>', mission.rover.setPosition('FFRFFFF'));
console.log('planet obs >>', mission.planet.obstacles);
console.log('getPosition >>', mission.rover.getPosition());