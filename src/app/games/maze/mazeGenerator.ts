export type Grid = {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
  
  const options = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];
  
  const SIZE = 25;
  
  export function generateMaze(): Grid[][] {
    const gridArray: Grid[][] = Array.from({ length: SIZE }, () =>
      Array.from({ length: SIZE }, () => ({
        top: true,
        bottom: true,
        left: true,
        right: true,
      }))
    );
  
    const isVisited: boolean[][] = Array.from({ length: SIZE }, () =>
      Array(SIZE).fill(false)
    );
  
    function connectBothGrid(i: number, j: number, newI: number, newJ: number) {
      if (newI === i - 1) {
        gridArray[i][j].top = false;
        gridArray[newI][newJ].bottom = false;
      } else if (newI === i + 1) {
        gridArray[i][j].bottom = false;
        gridArray[newI][newJ].top = false;
      } else if (newJ === j - 1) {
        gridArray[i][j].left = false;
        gridArray[newI][newJ].right = false;
      } else if (newJ === j + 1) {
        gridArray[i][j].right = false;
        gridArray[newI][newJ].left = false;
      }
    }
  
    function createMaze(i: number, j: number) {
      isVisited[i][j] = true;
      const directions = [...options].sort(() => Math.random() - 0.5); 
  
      for (const [di, dj] of directions) {
        const newI = i + di;
        const newJ = j + dj;
        if (newI >= 0 && newI < SIZE && newJ >= 0 && newJ < SIZE && !isVisited[newI][newJ]) {
          connectBothGrid(i, j, newI, newJ);
          createMaze(newI, newJ);
        }
      }
    }
  
    createMaze(0, 0);
    return gridArray;
  }
  