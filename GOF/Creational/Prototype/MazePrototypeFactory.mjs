export class MazePrototypeFactory /* extends MazeFactory */ {
  constructor(Maze, Wall, Room, Door) {
    // super();
    this.prototypeMaze = Maze;
    this.prototypeWall = Wall;
    this.prototypeRoom = Room;
    this.prototypeDoor = Door;
  }
  makeMaze() {
    return this.prototypeMaze.clone();
  }
  makeRoom(roomNumber) {
    const room = this.prototypeRoom.clone();
    room.initialize(roomNumber);
    return room;
  }
  makeWall() {
    return this.prototypeWall.clone();
  }
  makeDoor(room1, room2) {
    const door = this.prototypeDoor.clone();
    door.initialize(room1, room2);
    return door;
  }
}
