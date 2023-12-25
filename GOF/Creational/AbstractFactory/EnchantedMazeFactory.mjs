import { EnchantedRoom, DoorNeedingSpell } from '../EnchantedComponents.mjs';
import { mazeFactory } from './MazeFactory.mjs';

// singleton
const enchantedMazeFactory = {
  ...mazeFactory,
  makeRoom(number) {
    return new EnchantedRoom(number);
  },
  makeDoor(room1, room2) {
    return new DoorNeedingSpell(room1, room2);
  },
  spell: 'abracadabra',
};

export { enchantedMazeFactory };
