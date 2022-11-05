import { StyleSheet, View } from "react-native";
import { useState } from "react";
import * as Constants from "../constants.js";
import createGrid from "../utils/createGrid.js";
import copyGrid from "../utils/copyGrid.js";
import revealGrid from "../utils/revealGrid.js";
import getNbNonRevealedCells from "../utils/getNbNonRevealedCells.js";
import Cell from "./Cell.js";

export default function Grid({ setGameStatus }) {
  const [grid, setGrid] = useState(
    createGrid(Constants.NB_ROWS, Constants.NB_COLS, Constants.NB_MINES)
  );

  // Check if the game is won
  const nbNonRevealedCells = getNbNonRevealedCells(grid);
  if (nbNonRevealedCells === Constants.NB_MINES) {
    setGameStatus("won");
  }

  const setFlagged = (row, col) => {
    const newGrid = copyGrid(grid);
    if (newGrid[row][col].status === "hidden") {
      newGrid[row][col].status = "flagged";
    } else if (newGrid[row][col].status === "flagged") {
      newGrid[row][col].status = "hidden";
    }
    setGrid(newGrid);
  };

  const setRevealed = (row, col) => {
    const newGrid = revealGrid(grid, row, col);
    setGrid(newGrid);
    setTimeout(() => {
      if (newGrid[row][col].value === "x") {
        setGameStatus("lose");
      }
    }, 1000); // Set timeout of 1s so the player can see the mine and understand that he/she lost
  };

  return (
    <View style={styles.border}>
      <View style={styles.grid}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                {...cell}
                onPress={() => setRevealed(rowIndex, colIndex)}
                onLongPress={() => setFlagged(rowIndex, colIndex)}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  border: {
    borderWidth: Constants.BORDER_WIDTH * 2,
    borderTopColor: "#808080",
    borderLeftColor: "#808080",
    borderBottomColor: "white",
    borderRightColor: "white",
  },
  grid: {
    backgroundColor: "#c6c6c6",
    width: Constants.CELL_SIZE * Constants.NB_COLS,
    height: Constants.CELL_SIZE * Constants.NB_ROWS,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
