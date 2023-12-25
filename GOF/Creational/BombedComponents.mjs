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
}
export class RoomWithBomb extends Room {
  constructor(roomNo = 0, state = false) {
    super(roomNo);
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
}
