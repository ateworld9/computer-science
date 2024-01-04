import { direction } from './components.mjs';

export class MazeGame {
	constructor() {}

	createMaze() {
		console.log('createMaze()');
		const maze = this.makeMaze();

		const r1 = this.makeRoom(1);
		const r2 = this.makeRoom(2);
		const r1r2door = this.makeDoor(r1, r2);

		maze.addRoom(r1);
		maze.addRoom(r2);

		r1.setSide(direction.north, this.makeWall());
		r1.setSide(direction.east, r1r2door);
		r1.setSide(direction.south, this.makeWall());
		r1.setSide(direction.west, this.makeWall());

		r2.setSide(direction.north, this.makeWall());
		r2.setSide(direction.east, this.makeWall());
		r2.setSide(direction.south, this.makeWall());
		r2.setSide(direction.west, r1r2door);

		return maze;
	}
}
