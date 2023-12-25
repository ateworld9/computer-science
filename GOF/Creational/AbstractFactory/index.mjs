import { MazeGame } from './MazeGame.mjs';

import { bombedMazeFactory } from './BombedMazeFactory.mjs';
import { enchantedMazeFactory } from './EnchantedMazeFactory.mjs';

const mazeGame = new MazeGame();

const bombedMaze = mazeGame.createMaze(bombedMazeFactory);
console.log(bombedMaze);

const enchantedMaze = mazeGame.createMaze(enchantedMazeFactory);
console.log(enchantedMaze);
