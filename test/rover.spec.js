import { expect } from 'chai'
import { Rover } from '../lib/rover'

describe('[Rover/tests]', () => {
    const rover = new Rover()
    it('returnErrorMsg should return error message with rover\'s position', () => {
        const mockPos = { x: 34, y: 67, d: 'W' }
        expect(rover.returnErrorMsg(mockPos)).to.deep.equal({
            errorMsg: 'Obstacle detected at {\"x\":34,\"y\":67,\"d\":\"W\"}. Abort sequence.'
        })

    })
    describe('reachObstacles', () => {
        const mockObs = [
            { x: 2, y: 2 },
            { x: 4, y: 4 }
        ]
        it('should return true if rover reaches an obstacle', () => {
            const mockPos = { x: 2, y: 2, d: 'N' }
            expect(rover.reachObstacle(mockObs, mockPos)).to.equal(true)
        })
        it('should return false if no obstacle on rover\'s path', () => {
            const mockPos = { x: 1, y: 2, d: 'N' }
            expect(rover.reachObstacle(mockObs, mockPos)).to.equal(false)
        })
    })
    describe('accountForSphere', () => {
        const mockGrid = { maxX: 10, maxY: 10 }
        it('should wrap around the planet when x < 0', () => {
            const mockPos = { x: -1, y: 2, d: 'N' }
            expect(rover.accountForSphere(mockPos, mockGrid)).to.deep.equal({ x: 9, y: 2, d: 'N' })
        })
        it('should wrap around the planet when y < 0', () => {
            const mockPos = { x: 2, y: -1, d: 'N' }
            expect(rover.accountForSphere(mockPos, mockGrid)).to.deep.equal({ x: 2, y: 9, d: 'N' })
        })
        it('should wrap around the planet when x > maxX', () => {
            const mockPos = { x: 11, y: 2, d: 'N' }
            expect(rover.accountForSphere(mockPos, mockGrid)).to.deep.equal({ x: 1, y: 2, d: 'N' })
        })
        it('should wrap around the planet when y > maxY', () => {
            const mockPos = { x: 2, y: 11, d: 'N' }
            expect(rover.accountForSphere(mockPos, mockGrid)).to.deep.equal({ x: 2, y: 1, d: 'N' })
        })
    })
    describe('applyMove', () => {
        it('command F should move the rover forward by 1 step', () => {
            const defPosition = { x: 0, y: 0, d: 'N' }
            expect(rover.applyMove('F', defPosition)).to.deep.equal({ x: 0, y: 1, d: 'N' })
        })
        it('command B should move the rover backwards by 1 step', () => {
            const defPosition = { x: 0, y: 0, d: 'N' }
            expect(rover.applyMove('B', defPosition)).to.deep.equal({ x: 0, y: -1, d: 'S' })
        })
        it('command L should move the rover left by 1 step', () => {
            const defPosition = { x: 0, y: 0, d: 'N' }
            expect(rover.applyMove('L', defPosition)).to.deep.equal({ x: -1, y: 0, d: 'W' })
        })
        it('command R should move the rover right by 1 step', () => {
            const defPosition = { x: 0, y: 0, d: 'N' }
            expect(rover.applyMove('R', defPosition)).to.deep.equal({ x: 1, y: 0, d: 'E' })
        })
    })
    describe('setPosition', () => {
        it('should return the new position given a set of instructions', () => {
            expect(rover.setPosition('FFLR')).to.deep.equal({ x: 99, y: 3, d: 'N' })
            expect(rover.setPosition('BFFR')).to.deep.equal({ x: 98, y: 0, d: 'W' })
        })
    })
})