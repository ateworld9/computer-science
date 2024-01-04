// abstract class for components
export class MapSite {
	enter() {
		throw new Error('MapSite enter() is not implemented');
	}
}

// Components
export class Room extends MapSite {
	constructor(roomNumber = 0) {
		super();
		this.roomNumber = roomNumber;
		this.sides = {
			north: null,
			south: null,
			east: null,
			west: null,
		};
	}

	setSide(direction, mapSite) {
		this.sides[direction] = mapSite;
	}
	getSide(direction) {
		return this.sides[direction];
	}

	enter() {
		console.log(`enter room: ${this.roomNumber}`);
	}
}

export class Wall extends MapSite {
	constructor() {
		super();
	}
	enter() {
		console.log("You can't enter the wall");
	}
}

export class Door {
	constructor(room1, room2) {
		this.room1 = room1;
		this.room2 = room2;
		this.isOpen = false;
	}
	setRooms(room1, room2) {
		this.room1 = room1;
		this.room2 = room2;
	}

	enter() {
		if (this.isOpen) {
			console.log(`enter room: ${this.room2.roomNumber}`);
		} else {
			console.log('your nose is broken');
		}
	}
}

const direction = {
	north: 'North',
	south: 'South',
	east: 'East',
	west: 'West',
};

export { direction };
