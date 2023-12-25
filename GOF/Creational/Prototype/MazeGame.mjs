import { direction } from '../components.mjs';

export class MazeGame {
  createMaze(factory) {
    console.log('createMaze(factory)');

    const maze = factory.makeMaze();

    const r1 = factory.makeRoom(1);
    const r2 = factory.makeRoom(2);
    const r1r2door = factory.makeDoor(r1, r2);

    maze.addRoom(r1);
    maze.addRoom(r2);

    r1.setSide(direction.north, factory.makeWall());
    r1.setSide(direction.east, r1r2door);
    r1.setSide(direction.south, factory.makeWall());
    r1.setSide(direction.west, factory.makeWall());

    r2.setSide(direction.north, factory.makeWall());
    r2.setSide(direction.east, factory.makeWall());
    r2.setSide(direction.south, factory.makeWall());
    r2.setSide(direction.west, r1r2door);

    return maze;
  }
}
