import { BombedWall, RoomWithBomb } from '../BombedComponents.mjs';
import { DoorNeedingSpell, EnchantedRoom } from '../EnchantedComponents.mjs';
import { Maze } from '../Maze.mjs';
import { Door, Room, Wall, direction } from '../components.mjs';

export class MazeGame {
  createMaze() {
    const maze = this.makeMaze();

    const room1 = this.makeRoom(1);
    const room2 = this.makeRoom(2);

    const door = this.makeDoor(room1, room2);

    maze.addRoom(room1);
    maze.addRoom(room2);

    room1.setSide(direction.north, this.makeWall());
    room1.setSide(direction.east, door);
    room1.setSide(direction.south, this.makeWall());
    room1.setSide(direction.west, this.makeWall());

    room2.setSide(direction.north, this.makeWall());
    room2.setSide(direction.east, this.makeWall());
    room2.setSide(direction.south, this.makeWall());
    room2.setSide(direction.west, door);

    return maze;
  }

  // Factory methods
  makeMaze() {
    return new Maze();
  }
  makeRoom(roomNumber) {
    return new Room(roomNumber);
  }
  makeWall() {
    return new Wall();
  }
  makeDoor(room1, room2) {
    return new Door(room1, room2);
  }
}

export class BombedMazeGame extends MazeGame {
  constructor() {
    super();
  }

  makeWall() {
    return new BombedWall();
  }
  makeRoom(roomNumber) {
    return new RoomWithBomb(roomNumber);
  }
}

export class EnchantedMazeGame extends MazeGame {
  constructor() {
    super();
  }

  makeRoom(roomNumber) {
    return new EnchantedRoom(roomNumber);
  }
  makeDoor(room1, room2) {
    return new DoorNeedingSpell(room1, room2);
  }
}
