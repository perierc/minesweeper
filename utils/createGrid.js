export default function createGrid(nbRows, nbCols, nbMines) {
  // Create a 2D array of length nbRows * nbCols without mines
  let grid = [];
  for (let i = 0; i < nbRows; i++) {
    let row = [];
    for (let j = 0; j < nbCols; j++) {
      row.push({ value: 0, status: "hidden" });
    }
    grid.push(row);
  }

  // Add mines randomly
  let mines = 0;
  while (mines < nbMines) {
    let row = Math.floor(Math.random() * nbRows);
    let col = Math.floor(Math.random() * nbCols);
    if (grid[row][col].value !== "x") {
      grid[row][col].value = "x";
      mines++;
    }
  }

  // Indicate the number of mines around each non-mine cell
  for (let row = 0; row < nbRows; row++) {
    for (let col = 0; col < nbCols; col++) {
      if (grid[row][col].value !== "x") {
        let nbMinesAround = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (
              row + i >= 0 &&
              row + i < nbRows &&
              col + j >= 0 &&
              col + j < nbCols &&
              grid[row + i][col + j].value === "x"
            ) {
              nbMinesAround++;
            }
          }
        }
        grid[row][col].value = nbMinesAround;
      }
    }
  }

  return grid;
}
