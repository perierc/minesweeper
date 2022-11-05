import { StyleSheet, View, Button, Text } from "react-native";
import { useRef, useState } from "react";
import Grid from "./components/Grid";
import ModalPopup from "./components/ModalPopup";

export default function App() {
  const [gameStatus, setGameStatus] = useState("playing");
  const [gameId, setGameId] = useState(0);
  const modalMessage = useRef(null);

  if (gameStatus !== "playing") {
    modalMessage.current = gameStatus;
  }

  const resetGame = () => {
    setGameId(gameId + 1);
    setGameStatus("playing");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minesweeper</Text>
      <Grid key={gameId} setGameStatus={setGameStatus} />
      <Button title="New Game" onPress={resetGame} />
      <ModalPopup visible={gameStatus !== "playing"}>
        <Text style={styles.modalTitle}>{`You ${modalMessage.current}!`}</Text>
        <Button title="Retry" onPress={resetGame} />
      </ModalPopup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#c6c6c6",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
});
