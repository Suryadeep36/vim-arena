"use client";

import { useEffect, useState, useRef } from "react";
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
//@ts-ignore
import { initVimMode } from "monaco-vim";

export default function SnakeGame() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [code, setCode] = useState(`
  let num = [1, 2, 3, 4;  
  consoe.log("Numbers:", num)  

  for let i = 0; i < num.length i++) {  
    if num[i] % 2 == 0 {  
      consoe.log("Even:", num[i]);  
    }  
  }  
  `);
  const editorRef = useRef<any>(null);
  const statusBarRef = useRef<HTMLDivElement>(null);
  const monaco = useMonaco();

  const startGame = () => {
    setIsGameRunning(true);
    setScore(0);
  };

  useEffect(() => {
    if (editorRef.current && monaco) {
      const vimMode = initVimMode(editorRef.current, statusBarRef.current);
      return () => vimMode.dispose(); 
    }
  }, [monaco]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col md:flex-row items-center justify-center p-6 space-y-8 md:space-y-0 md:space-x-10">
      <div className="flex flex-col space-y-6 items-center md:items-start">
        <h1 className="text-3xl md:text-4xl font-bold text-green-400">
          Vim Syntex Fix Game
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
        <Editor
          className="w-full h-full"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          onChange={(newValue) => setCode(newValue || "")}
          options={{
            fontSize: 18,      
            wordWrap: "on",      
            minimap: { enabled: false }, 
            scrollBeyondLastLine: false,
            automaticLayout: true,  
            formatOnPaste: true,  
            formatOnType: true,
          }}
        />
        <div ref={statusBarRef} className="text-green-400 mt-2 text-lg font-semibold"></div>
      </div>
    </div>
  );
}
