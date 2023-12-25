import { Maze } from '../Maze.mjs';
import { Door, Room, Wall, direction } from '../components.mjs';

class MazeBuilder {
  constructor() {}
  buildMaze() {
    throw new Error('MazeBuilder buildMaze is not implemented');
  }
  buildRoom(room) {
    throw new Error('MazeBuilder buildRoom is not implemented');
  }
  buildDoor(roomFrom, roomTo) {
    throw new Error('MazeBuilder buildDoor is not implemented');
  }
  getMaze() {
    throw new Error('MazeBuilder getMaze is not implemented');
  }
}

export class StandartMazeBuilder extends MazeBuilder {
  constructor() {
    super();
    this.maze = null;
  }

  buildMaze() {
    this.maze = new Maze();
  }
  buildRoom(roomNum) {
    if (this.maze.getRoom(roomNum) === undefined) {
      const room = new Room(roomNum);
      this.maze.addRoom(room);

      room.setSide(direction.north, new Wall());
      room.setSide(direction.south, new Wall());
      room.setSide(direction.east, new Wall());
      room.setSide(direction.west, new Wall());
    }
  }
  buildDoor(roomFrom, roomTo) {
    if (!this.maze.getRoom(roomFrom)) {
      throw new Error(`room:${roomFrom} is not Exist`);
    }
    if (!this.maze.getRoom(roomTo)) {
      throw new Error(`room:${roomTo} is not Exist`);
    }

    const r1 = this.maze.getRoom(roomFrom);
    const r2 = this.maze.getRoom(roomTo);

    const door = new Door(r1, r2);
    r1.setSide(direction.east, door);
    r2.setSide(direction.west, door);
  }
  getMaze() {
    return this.maze;
  }
}

export class CountingMazeBuilder extends MazeBuilder {
  constructor() {
    super();
    this.rooms = 0;
    this.doors = 0;
  }
  buildMaze() {}

  buildRoom(roomNum) {
    this.rooms++;
  }
  buildDoor(roomFrom, roomTo) {
    this.doors++;
  }
  getMaze() {
    return {};
  }
  getCounts() {
    return { rooms: this.rooms, doors: this.doors };
  }
}
