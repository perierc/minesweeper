export default function copyGrid(grid) {
  // Return a deep copy of the grid
  const newGrid = grid.map((row) =>
    row.map((cell) => {
      return { ...cell };
    })
  );
  return newGrid;
}
