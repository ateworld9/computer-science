import { Maze } from '../Maze.mjs';
import { Door, Room, Wall } from '../components.mjs';

class MazeFactory {
	instance = null;
	static Instance() {
		if (MazeFactory.instance === null) {
			MazeFactory.instance = new MazeFactory();
			return MazeFactory.instance;
		}

		return MazeFactory.instance;
	}
}
