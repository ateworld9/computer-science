import { Maze } from '../Maze.mjs';
import { Door, Room, Wall } from '../components.mjs';

const mazeFactory = {
	makeMaze() {
		return new Maze();
	},
	makeWall() {
		return new Wall();
	},
	makeRoom(number) {
		return new Room(number);
	},
	makeDoor(room1, room2) {
		return new Door(room1, room2);
	},
};

export { mazeFactory };
