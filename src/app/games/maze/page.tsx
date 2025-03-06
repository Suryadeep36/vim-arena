"use client";

import { useEffect, useState } from "react";
import { generateMaze, Grid } from "./mazeGenerator";

export default function SnakeGame() {
    const [time, setTime] = useState(0);
    const [bestTime, setBestTime] = useState<number | null>(null);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [gridArray, setGridArray] = useState<Grid[][]>([]);
    type Position = { x: number; y: number };
    const [player, setPlayer] = useState<Position>({ x: 0, y: 0 });

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isGameRunning) {
            setTime(0);
            timer = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isGameRunning]);

    const handleKey = (e: KeyboardEvent) => {
        if (!isGameRunning) return;
        const key = e.key.toLowerCase();
        if (key === "h" && player.y - 1 >= 0 && !gridArray[player.x][player.y].left) {
            player.y = player.y - 1;
        } else if (key === "l" && player.y + 1 <= 24 && !gridArray[player.x][player.y].right) {
            player.y = player.y + 1;
        } else if (key === "k" && player.x - 1 >= 0 && !gridArray[player.x][player.y].top) {
            player.x = player.x - 1;
        } else if (key === "j" && player.x + 1 <= 24 && !gridArray[player.x][player.y].bottom) {
            player.x = player.x + 1;
        }
        movePlayer();
    };

    const movePlayer = () => {
        setPlayer({ x: player.x, y: player.y });
        if (player.x === 24 && player.y === 24) {
            endGame();
        }
    };

    const endGame = () => {
        setIsGameRunning(false);
        setBestTime((prev) => (prev === null || time < prev ? time : prev));
    };

    const resetGame = () => {
        setIsGameRunning(false);
        setTime(0);
        setPlayer({ x: 0, y: 0 });
    };

    const startGame = () => {
        resetGame();
        setIsGameRunning(true);
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKey);
        if (!isGameRunning) {
            setGridArray(generateMaze());
        }
        return () => {
            window.removeEventListener("keydown", handleKey);
        };
    }, [isGameRunning]);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row items-center justify-center p-6 space-y-8 md:space-y-0 md:space-x-10">
            <div className="flex flex-col space-y-6 items-center md:items-start">
                <h1 className="text-3xl md:text-4xl font-bold text-green-400">Vim Maze Game</h1>
                <div className="text-lg font-semibold space-y-2 text-center md:text-left">
                    <p>Time: <span className="text-green-400">{time}s</span></p>
                    {bestTime !== null && <p>Best Time: <span className="text-yellow-400">{bestTime}s</span></p>}
                </div>
                <button
                    className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-500"
                    onClick={isGameRunning ? resetGame : startGame}
                >
                    {isGameRunning ? "Restart Game" : "Start Game"}
                </button>
            </div>
            <div className="relative w-[600px] h-[600px] bg-black border-4 border-green-500 rounded-lg shadow-lg">
                {gridArray.map((row, i) =>
                    row.map((cell, j) => (
                        <div
                            key={`${i}-${j}`}
                            className={`absolute w-5 h-5 ${i == player.x && j == player.y ? "bg-red-700" : i == 24 && j == 24 ? "bg-yellow-300" : ""} border-green-500`}
                            style={{ left: j * 24, top: i * 24 }}
                        >
                            {cell.top && <div className="absolute top-0 left-0 w-full border-t-1 border-green-500" />}
                            {cell.bottom && (i < row.length - 1 ? !gridArray[i+1][j].top : true) && <div className="absolute bottom-0 left-0 w-full border-b-1 border-green-500" />}
                            {cell.left && <div className="absolute top-0 left-0 h-full border-l-1 border-green-500" />}
                            {cell.right && (j < row.length - 1 ? !gridArray[i][j+1].left : true) && <div className="absolute top-0 right-0 h-full border-r-1 border-green-500" />}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}