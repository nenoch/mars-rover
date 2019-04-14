import { expect } from 'chai'
import { Planet } from '../lib/planet'

describe('[Planet/tests]', () => {
    const planet = new Planet()
    it('generateObstacle should generate coordinates for an obstacle', () => {
        const obstacle = planet.generateObstacle()
        expect(obstacle).to.have.property('x')
        expect(obstacle).to.have.property('y')
        expect(obstacle.x).to.be.within(0, 100)
        expect(obstacle.y).to.be.within(0, 100)
    })
    it('setObstacles should generate obstacles on the planet', () => {
        const obstacles = planet.setObstacles([])
        expect(obstacles.length).to.be.within(0, 4)
    })
})