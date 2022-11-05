export default function getNbNonRevealedCells(grid) {
  // Return the number of non-revealed cells in the grid
  let nbNonRevealedCells = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col].status !== "revealed") {
        nbNonRevealedCells++;
      }
    }
  }
  return nbNonRevealedCells;
}
