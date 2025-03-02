export default function GamesPage() {
  const games = [
    { 
      title: "Snake Game", 
      image: "/images/snake-game.webp",
      description: "Classic snake game using Vim keybindings.",
      link: "/games/snake",
      difficulty: "Easy",
      mode: "Singleplayer"
    },
    { 
      title: "Maze Game", 
      image: "/images/maze-game.webp",
      description: "Navigate through the maze with Vim keys.",
      link: "/games/maze",
      difficulty: "Medium",
      mode: "Singleplayer"
    },
    { 
      title: "Syntax Fix Game", 
      image: "/images/syntax-fix-game.webp",
      description: "Find and fix syntax errors using Vim.",
      link: "/games/syntax-fix",
      difficulty: "Hard",
      mode: "Singleplayer & Multiplayer"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-8">Choose Your Game</h1>
      <div className="grid grid-cols-1 gap-8 max-w-xl mx-auto">
        {games.map((game, index) => (
          <div 
            key={index} 
            className={`bg-gray-800 rounded-lg p-6 shadow-md hover:scale-105 transition hover:shadow-lg ${game.difficulty === "Easy" ? " hover:shadow-green-500/50" : game.difficulty === "Medium" ? " hover:shadow-yellow-500/50" : " hover:shadow-red-500/50"}`}
          >
            <img 
              src={game.image} 
              alt={game.title} 
              className="w-full h-48 object-cover rounded-md border border-gray-700"
            />
            <h2 className="mt-4 text-xl font-semibold">{game.title}</h2>
            <p className="mt-2 text-gray-400">{game.description}</p>

            {/* Difficulty Badge */}
            <span className={`mt-3 inline-block px-3 py-1 text-xs font-semibold rounded-full 
              ${game.difficulty === "Easy" ? "bg-green-600" : 
                game.difficulty === "Medium" ? "bg-yellow-600" : 
                "bg-red-600"}
              `}>
              {game.difficulty}
            </span>

            {/* Game Mode Badge */}
            <span className="ml-2 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-600">
              {game.mode}
            </span>

            {/* Play Button */}
            <a 
              href={game.link} 
              className="mt-4 block w-full text-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white font-semibold shadow-md"
            >
              Play Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
