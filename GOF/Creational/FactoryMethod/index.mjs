import { BombedMazeGame, EnchantedMazeGame, MazeGame } from './MazeGame.mjs';

const game = new MazeGame();
const maze = game.createMaze();
console.log(maze);

const bombedGame = new BombedMazeGame();
const bombedMaze = game.createMaze();
console.log(bombedMaze);

const enchantedGame = new EnchantedMazeGame();
const enchantedMaze = game.createMaze();
console.log(enchantedMaze);
