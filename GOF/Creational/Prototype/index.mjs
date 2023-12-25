import { MazeGame } from '../AbstractFactory/MazeGame.mjs';
import { Maze } from './Maze.mjs';
import { MazePrototypeFactory } from './MazePrototypeFactory.mjs';
import { Door, Room, Wall } from './components.mjs';
import { BombedWall, RoomWithBomb } from './BombedComponents.mjs';

const game = new MazeGame();
const simpleMazeFactory = new MazePrototypeFactory(
  new Maze(),
  new Wall(),
  new Room(),
  new Door(),
);
const maze = game.createMaze(simpleMazeFactory);
console.log(maze);

const bombedMazeFactory = new MazePrototypeFactory(
  new Maze(),
  new BombedWall(),
  new RoomWithBomb(),
  new Door(),
);
const bombedMaze = game.createMaze(bombedMazeFactory);
console.log(bombedMaze);
