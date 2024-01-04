export class Maze {
	constructor() {
		this.rooms = new Map();
	}
	addRoom(room) {
		this.rooms.set(room.roomNumber, room);
	}
	getRoom(roomNumber) {
		return this.rooms.get(roomNumber);
	}
}
