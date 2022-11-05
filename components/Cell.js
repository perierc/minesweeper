import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Constants from "../constants.js";

export default function Cell({ value, status, onPress, onLongPress }) {
  const cellStyle =
    status === "revealed" ? styles.revealedCell : styles.hiddenCell;

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={status === "revealed"}
    >
      <View style={cellStyle}>
        {status === "revealed" &&
          (value === "x" ? (
            <Image source={require("../assets/mine.png")} style={styles.img} />
          ) : value === 0 ? null : (
            <Text style={styles.text}>{value}</Text>
          ))}
        {status === "flagged" && (
          <Image source={require("../assets/flag.png")} style={styles.img} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  hiddenCell: {
    width: Constants.CELL_SIZE,
    height: Constants.CELL_SIZE,
    backgroundColor: "#c6c6c6",
    borderWidth: Constants.BORDER_WIDTH,
    borderTopColor: "white",
    borderLeftColor: "white",
    borderBottomColor: "#808080",
    borderRightColor: "#808080",
    justifyContent: "center",
    alignItems: "center",
  },
  revealedCell: {
    width: Constants.CELL_SIZE,
    height: Constants.CELL_SIZE,
    backgroundColor: "#c6c6c6",
    borderWidth: 1,
    borderColor: "#808080",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: Constants.CELL_SIZE / 2,
    fontWeight: "bold",
  },
  img: {
    width: Constants.CELL_SIZE - 3 * Constants.BORDER_WIDTH,
    height: Constants.CELL_SIZE - 3 * Constants.BORDER_WIDTH,
  },
});
