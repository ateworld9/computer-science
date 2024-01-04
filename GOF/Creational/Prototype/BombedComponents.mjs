import { Room, Wall } from './components.mjs';

export class BombedWall extends Wall {
	constructor(state = false) {
		super();
		this.bombed = state;
	}

	mine() {
		this.bombed = true;
	}

	enter() {
		if (this.bombed) {
			console.log('You going through BombedWall');
		} else {
			console.log("You can't enter the wall");
		}
	}

	clone() {
		return new BombedWall();
	}
}
export class RoomWithBomb extends Room {
	constructor(roomNumber = 0, state = false) {
		super(roomNumber);
		this.bomb = state;
	}

	setBomb() {
		this.bomb = true;
	}
	removeBomb() {
		this.bomb = false;
	}

	enter() {
		if (this.bomb) {
			console.log(`You are mined in BombedRoom ${this.roomNumber}`);
		} else {
			console.log('You enter the BombedRoom');
		}
	}

	clone() {
		const newRoom = new RoomWithBomb();
		newRoom.roomNumber = this.roomNumber;
		newRoom.sides = this.sides;
		newRoom.bomb = this.bomb;
		return newRoom;
	}
	initialize(roomNumber = 0, state = false) {
		this.roomNumber = roomNumber;
	}
}
