import { Door, Room } from './components.mjs';

export class EnchantedRoom extends Room {
	constructor(roomNo = 0) {
		super(roomNo);
	}
}
export class DoorNeedingSpell extends Door {
	constructor(room1, room2) {
		super(room1, room2);
	}
}
