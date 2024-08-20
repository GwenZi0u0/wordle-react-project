import "./App.css";
import { GameProvider } from "./GameContext";
import WordGame from "./WordGame";

function App() {
  return (
    <GameProvider>
      <div className="App">
        <WordGame />
      </div>
    </GameProvider>
  );
}
export default App;
