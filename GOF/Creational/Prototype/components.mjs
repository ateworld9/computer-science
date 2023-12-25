// abstract class for components
export class MapSite {
  enter() {
    throw new Error('MapSite enter() is not implemented');
  }
  clone() {
    throw new Error('MapSite clone() is not implemented');
  }
  initialize() {
    throw new Error('MapSite initialize() is not implemented');
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

  clone() {
    const newRoom = new Room();
    newRoom.roomNumber = this.roomNumber;
    newRoom.sides = this.sides;
    return newRoom;
  }
  initialize(roomNumber) {
    this.roomNumber = roomNumber;
  }
}

export class Wall extends MapSite {
  constructor() {
    super();
  }
  enter() {
    console.log("You can't enter the wall");
  }
  clone() {
    return new Wall();
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
  clone() {
    const newDoor = new Door();
    newDoor.room1 = this.room1;
    newDoor.room2 = this.room2;
    newDoor.isOpen = this.isOpen;
    return newDoor;
  }
  initialize(room1, room2) {
    this.room1 = room1;
    this.room2 = room2;
  }
}

const direction = {
  north: 'North',
  south: 'South',
  east: 'East',
  west: 'West',
};

export { direction };
