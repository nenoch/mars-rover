# Mars Rover

You’re part of the team that explores Mars by sending remotely controlled vehicles to the surface of the planet. Develop an API that translates the commands sent from earth to instructions that are understood by the rover.

*Requirements:*
- You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing.
- The rover receives a character array of commands.
- Implement commands that move the rover forward/backward (f,b).
- Implement commands that turn the rover left/right (l,r).
- Implement wrapping from one edge of the grid to another. (planets are spheres after all)
- Implement obstacle detection before each move to a new square. If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point, aborts the sequence and reports the obstacle.

### **How to run**
```
npm install
npm start
```
Edit `index.js` and run `npm start` to move your own rover on Mars's surface!

## **Implementation**

*Assumptions: (aka: things I would normally check with UX and/or the Product Owner)*
- The rover turns towards the direction of the move
- Every letter (F, B, R, L) stands for a +1 move
- When reaching an obstacle, the rover stays at obstacle's position aborting all subsequent moves. Hence, the position in the report is the same as the obstacle's.

### Testing approach
```
npm test
```
I wouldn't usually test private methods, since they are tested within the exposed public function, but I felt like being very thorough (and I *love* testing) this being a quite small implementation.

### Possible (simple) future improvements
1) **Typescript**: this implementation would definitely benefit from the addition of types and interfaces. As an example, `Planet` and `Rover` classes share a `position` model that goes through quite a lot of parsing and transformation. Something like the few lines below can make the code more reliable when introducing new features.
```
type Cardinals = 'N' | 'S' | 'E' | 'W'
type RangeNum = 0..99
export interface Position {
    x: RangeNum,
    y: RangeNum,
    d: Cardinals
}
``` 
2) **REST API**: ideally this would become a proper REST API with a set of CRUD operations. It would require the addition of an [express](https://expressjs.com/) server and a [swagger](https://swagger.io/) layer for documentation and extra readability.

3) **Postman**: no API implementation is completed without including a [postman collection](https://www.getpostman.com/) folder. This might feel like overkilling given the swagger documentation, but the next developer working on the project will thank you.