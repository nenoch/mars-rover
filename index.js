import { Rover } from './lib/rover'

const rover = new Rover();
console.log('rover.setPosition >>', rover.setPosition('BFFLLRF'));
console.log('getPosition >>', rover.getPosition());