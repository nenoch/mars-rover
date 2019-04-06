const applyMove = require('./utils').applyMove;
const getRandomInt = require('./utils').getRandomInt;

class Planet {
    constructor(maxX = 100, maxY = 100, maxObs = 4) {
        this.maxX = maxX;
        this.maxY = maxY;
        this.maxObs = maxObs;
        this.obstacles = [
            { x: 2, y: 2 }
        ]
        // this.obstacles = this.setObstacles([]);
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
        [...instructions].forEach(m => {
            const newPosition = applyMove(m, mission.rover.position);
            if (this.isObstacle(this.planet.getObstacles(), newPosition)) {
                throw 'bye';
            }

            // for (let obs of this.planet.obstacles) {
            //     return (obs.x == newPosition.x && obs.y == newPosition.y);
            //     // {
            //         // return true;
            //         // throw `Obstacle detected at ${JSON.stringify(newPosition)}`;
            //     // }
            //     // return false;
            // }
            console.log('I got here', this.position);
            this.position = this.accountForSphere(newPosition, this.planet.maxX, this.planet.maxY);
        })
        console.log('and here', this.position);
        return this.position;
    }

    // private
    isObstacle(obstacles, position) {
        for (let obs of obstacles) {
            return (obs.x === position.x && obs.y === position.y);
        }
    }

    // private
    accountForSphere(position, maxX, maxY) {
        if (position.x < 0) { position.x = maxX + position.x }
        if (position.y < 0) { position.y = maxY + position.y }
        if (position.x > maxX) { position.x = position.x - maxX }
        if (position.y > maxY) { position.y = position.y - maxY }
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
console.log('mission.rover.setPosition >>', mission.rover.setPosition('FFRF'));
console.log('planet obs >>', mission.planet.obstacles);
console.log('getPosition >>', mission.rover.getPosition());