"use client";

import { useEffect, useState } from "react";

export default function SnakeGame() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);

  type Position = { x: number; y: number };
  type Food = { x: number; y: number; isCaptured: boolean };
  type Wall = { x: number; y: number };

  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [foodPosition, setFoodPosition] = useState<Food>({
    x: 50,
    y: 50,
    isCaptured: false,
  });
  const [direction, setDirection] = useState<string>("right");
  const [walls, setWalls] = useState<Wall[]>([]);

  const validatePosition = (pos: number) => (pos < 10 ? 580 : pos > 580 ? 10 : pos);

  const getRandomNumber = (min: number, max: number) => 
    Math.round(Math.random() * (max - min) + min) * 10;

  const handleKey = (e: KeyboardEvent) => {
    if (!isGameRunning) return;
    const key = e.key.toLowerCase();
    if (key === "h" && direction !== "right") setDirection("left");
    else if (key === "j" && direction !== "up") setDirection("down");
    else if (key === "k" && direction !== "down") setDirection("up");
    else if (key === "l" && direction !== "left") setDirection("right");
  };

  const moveSnake = () => {
    if (!isGameRunning) return;

    setSnake((prev) => {
      let newHead = { ...prev[0] };

      if (direction === "left") newHead.x = validatePosition(newHead.x - 10);
      if (direction === "right") newHead.x = validatePosition(newHead.x + 10);
      if (direction === "up") newHead.y = validatePosition(newHead.y - 10);
      if (direction === "down") newHead.y = validatePosition(newHead.y + 10);

      let newSnake = [newHead, ...prev];

      if (newHead.x === foodPosition.x && newHead.y === foodPosition.y) {
        setScore((prevScore) => prevScore + 1);
        addFood();
        addWall();
      } else {
        newSnake.pop();
      }

      const isGameOver = walls.some((wall) => newHead.x === wall.x && newHead.y === wall.y);
      if (isGameOver) {
        resetGame();
        return prev; 
      }

      return newSnake;
    });
  };

  const addFood = () => {
    setFoodPosition({
      x: getRandomNumber(1, 58),
      y: getRandomNumber(1, 58),
      isCaptured: false,
    });
  };

  const addWall = () => {
    const newWall: Wall = {
      x: getRandomNumber(1, 58),
      y: getRandomNumber(1, 58),
    };
    setWalls((prev) => [...prev, newWall]); 
  };

  const resetGame = () => {
    setIsGameRunning(false);
    setHighScore((prev) => Math.max(prev, score)); 
    setScore(0);
    setSnake([{ x: 10, y: 10 }]);
    setWalls([]); 
    setDirection("right");
    addFood();
  };

  const startGame = () => {
    setIsGameRunning(true);
    setScore(0);
    setSnake([{ x: 10, y: 10 }]);
    setWalls([]); 
    setDirection("right");
    addFood();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    const interval = setInterval(moveSnake, 100);

    return () => {
      window.removeEventListener("keydown", handleKey);
      clearInterval(interval);
    };
  }, [direction, isGameRunning]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row items-center justify-center p-6 space-y-8 md:space-y-0 md:space-x-10">
      <div className="flex flex-col space-y-6 items-center md:items-start">
        <h1 className="text-3xl md:text-4xl font-bold text-green-400">
          Vim Snake Game
        </h1>

        <div className="text-lg font-semibold space-y-2 text-center md:text-left">
          <p>
            Score: <span className="text-green-400">{score}</span>
          </p>
          <p>
            High Score: <span className="text-yellow-400">{highScore}</span>
          </p>
        </div>

        <div className="p-4 bg-gray-800 rounded-lg shadow-md w-60 text-center">
          <h2 className="text-lg font-semibold mb-2">Controls</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 bg-gray-700 rounded col-span-3">H ← Left</div>
            <div className="p-2 bg-gray-700 rounded col-span-3">J ↓ Down</div>
            <div className="p-2 bg-gray-700 rounded col-span-3">K ↑ Up</div>
            <div className="p-2 bg-gray-700 rounded col-span-3">L → Right</div>
          </div>
        </div>

        <button
          className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-500"
          onClick={startGame}
        >
          {isGameRunning ? "Restart Game" : "Start Game"}
        </button>
      </div>

      <div className="relative w-[600px] h-[600px] bg-black border-4 border-green-500 rounded-lg shadow-lg">
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-green-400 w-5 h-5 rounded"
            style={{ left: segment.x, top: segment.y }}
          />
        ))}

        <div
          className="absolute bg-red-500 w-5 h-5 rounded"
          style={{ left: foodPosition.x, top: foodPosition.y }}
        />

        {walls.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-blue-400 w-5 h-5 rounded"
            style={{ left: segment.x, top: segment.y }}
          />
        ))}
      </div>
    </div>
  );
}
