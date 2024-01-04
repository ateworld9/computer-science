export class MazeGame {
	constructor() {}

	createMaze(builder) {
		builder.buildMaze();

		builder.buildRoom(1);
		builder.buildRoom(2);
		builder.buildDoor(1, 2);

		return builder.getMaze();
	}
}
