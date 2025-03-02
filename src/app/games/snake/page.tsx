"use client";

import { useEffect, useRef, useState } from "react";

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  type Position = {
    x: number
    y: number
  }
  const [cubePosition , setCubePosition] = useState<Position>({
    x: 10,
    y: 10
  })
  const validateLowerBound = (oldPos : number) => {
    if(oldPos - 15 >= 10){
      return (oldPos - 15)
    }
    else{
      return 580
    }
  }

  const getRandomNumber = (min : number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const validateUpperBound = (oldPos: number) => {
    if(oldPos + 15 <= 580){
      return (oldPos + 15)
    }
    else{
      return 10
    }
  }
  const handleKey = (e : any) => {
    const userInput : String= e.key
    if(userInput.toLowerCase() === "h"){
      //move left
      let newX = validateLowerBound(cubePosition.x);
      setCubePosition({
        x: newX,
        y: cubePosition.y
      })
    }
    else if(userInput.toLowerCase() === "j"){
      //move down
      let newY = validateUpperBound(cubePosition.y);
      setCubePosition({
        x: cubePosition.x,
        y: newY
      })
    }
    else if(userInput.toLowerCase() === "k"){
      //move up
      let newY = validateLowerBound(cubePosition.y);
      setCubePosition({
        x: cubePosition.x,
        y: newY
      })
    }
    else if(userInput.toLowerCase() === "l"){
      //move right
      let newX = validateUpperBound(cubePosition.x);
      setCubePosition({
        x: newX,
        y: cubePosition.y
      })
    }
  }
  const addFood = () => {
    if(canvasRef.current){
      const ctx = canvasRef.current.getContext("2d")
      if(ctx){
        const posx = getRandomNumber(10, 580)
        const posy = getRandomNumber(10, 580)
        ctx.fillStyle = 'red'
        ctx.fillRect(posx, posy, 10, 10);
      }
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'green'
        ctx.fillRect(cubePosition.x, cubePosition.y, 10, 10);
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row items-center justify-center p-6 space-y-8 md:space-y-0 md:space-x-10">
      {/* Left Section - Controls & Info */}
      <div className="flex flex-col space-y-6 items-center md:items-start">
        <h1 className="text-3xl md:text-4xl font-bold text-green-400">Vim Snake Game</h1>

        {/* Score Section */}
        <div className="text-lg font-semibold space-y-2 text-center md:text-left">
          <p>Score: <span className="text-green-400">{score}</span></p>
          <p>High Score: <span className="text-yellow-400">{highScore}</span></p>
        </div>

        {/* Controls */}
        <div className="p-4 bg-gray-800 rounded-lg shadow-md w-60 text-center">
          <h2 className="text-lg font-semibold mb-2">Controls</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 bg-gray-700 rounded col-span-3">H ← Left</div>
            <div className="p-2 bg-gray-700 rounded col-span-3">J ↓ Down</div>
            <div className="p-2 bg-gray-700 rounded col-span-3">K ↑ Up</div>
            <div className="p-2 bg-gray-700 rounded col-span-3">L → Right</div>
          </div>
        </div>

        {/* Start Button */}
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-500">
          Start Game
        </button>
      </div>

      {/* Right Section - Game Canvas (Responsive) */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="bg-black border-4 border-green-500 rounded-lg shadow-lg transition-all duration-300 hover:brightness-125 w-[90vw] h-[90vw] max-w-[600px] max-h-[600px]"
          width={600}
          height={600}
          style={{
            boxShadow: "0 0 20px #00ff00, inset 0 0 10px #00ff00",
          }}
        />
      </div>
    </div>
  );
}
