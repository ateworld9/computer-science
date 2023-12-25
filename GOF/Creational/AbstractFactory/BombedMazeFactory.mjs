import { BombedWall, RoomWithBomb } from '../BombedComponents.mjs';
import { mazeFactory } from './MazeFactory.mjs';

// singleton
const bombedMazeFactory = {
  ...mazeFactory,
  makeWall() {
    return new BombedWall();
  },
  makeRoom(number) {
    return new RoomWithBomb(number);
  },
};

export { bombedMazeFactory };
