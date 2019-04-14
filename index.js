import { Rover } from './src/lib/rover'
import { Planet } from './src/lib/planet'

const planet = new Planet();
const rover = new Rover(planet);
console.log("~ Mars-rover Playground ~", "\n");

console.log(
    "Get starting position: rover.getPosition >>",
    rover.getPosition(), "\n");
console.log(
    "Set rover's position: rover.setPosition('BFFLLRF') >>",
    rover.setPosition('BFFLLRF'), "\n");

console.log("\n", "Move the rover editing index.js, then run 'npm start' again.", "\n");