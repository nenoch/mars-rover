const applyMove = (move, currentPosition) => ({
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

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

module.exports = {
    applyMove: applyMove,
    getRandomInt: getRandomInt
}