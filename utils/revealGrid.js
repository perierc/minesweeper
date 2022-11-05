import copyGrid from "./copyGrid";

export default function revealGrid(grid, rowIndex, colIndex) {
  const newGrid = copyGrid(grid);
  let stack = [[rowIndex, colIndex]];
  while (stack.length > 0) {
    const [row, col] = stack.pop();

    if (newGrid[row][col].status !== "revealed") {
      newGrid[row][col].status = "revealed";

      // If the cell has no mines around, reveal all the cells around it
      if (newGrid[row][col].value === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (
              (row + i !== row || col + j !== col) &&
              row + i >= 0 &&
              row + i < newGrid.length &&
              col + j >= 0 &&
              col + j < newGrid[0].length
            ) {
              stack.push([row + i, col + j]);
            }
          }
        }
      }
    }
  }
  return newGrid;
}
