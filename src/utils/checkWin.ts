interface WinResult {
  isWin: boolean;
  cells: { row: number; col: number }[];
}

const checkWin = (
  board: string[][],
  row: number,
  col: number,
  currentTurn: string,
  winLength: number
): WinResult => {
  const directions = [
    { dr: 0, dc: 1 }, // Horizontal
    { dr: 1, dc: 0 }, // Vertical
    { dr: 1, dc: 1 }, // Diagonal down-right
    { dr: 1, dc: -1 }, // Diagonal down-left
  ];

  const boardSize = board.length;

  for (const { dr, dc } of directions) {
    let count = 1;
    const cells = [{ row, col }];

    // Check positive direction
    let r = row + dr;
    let c = col + dc;
    while (
      r >= 0 &&
      r < boardSize &&
      c >= 0 &&
      c < boardSize &&
      board[r][c] === currentTurn
    ) {
      count++;
      cells.push({ row: r, col: c });
      r += dr;
      c += dc;
    }

    // Check negative direction
    r = row - dr;
    c = col - dc;
    while (
      r >= 0 &&
      r < boardSize &&
      c >= 0 &&
      c < boardSize &&
      board[r][c] === currentTurn
    ) {
      count++;
      cells.push({ row: r, col: c });
      r -= dr;
      c -= dc;
    }

    if (count >= winLength) {
      return { isWin: true, cells };
    }
  }

  return { isWin: false, cells: [] };
};

export default checkWin;
