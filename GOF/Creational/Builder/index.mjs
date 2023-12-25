import { MazeGame } from './MazeGame.mjs';
import { StandartMazeBuilder, CountingMazeBuilder } from './Builder.mjs';
const game = new MazeGame();

const maze = game.createMaze(new StandartMazeBuilder());
console.log(maze);
const countingMazeBuilder = new CountingMazeBuilder();
const countingMaze = game.createMaze(countingMazeBuilder);
console.log(
  `В лабиринте есть ${countingMazeBuilder.rooms} ` +
    `комнат и ${countingMazeBuilder.doors} дверей`,
);
