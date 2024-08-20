import { useContext, useEffect } from "react";
import { ACTIONS } from "./ACTIONS";
import { GameContext, GameDispatchContext } from "./GameContext";

function WordGame() {
  const state = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key.match(/^[a-zA-Z]$/i)) {
        dispatch({ type: ACTIONS.ADD_LETTER, payload: event.key });
      } else if (event.key === "Backspace") {
        dispatch({ type: ACTIONS.REMOVE_LETTER });
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex items-center justify-center grow flex-col overflow-hidden w-full h-screen border-black">
      <h1 className="p-8">Word Game</h1>
      <div className="grid grid-rows-6 gap-y-1 p-2.5 box-border w-1/2 h-2/3">
        {Array(6)
          .fill(null)
          .map((_, rowIndex) => (
            <div className="grid grid-cols-5 gap-1.5" key={rowIndex}>
              {Array(5)
                .fill(null)
                .map((_, colIndex) => {
                  let letter = "";
                  if (rowIndex === state.currentRow) {
                    letter = state.currentGuess[colIndex] || "";
                  }
                  return (
                    <div
                      className="w-24 h-24 bg-transparent border-inherit border-2"
                      key={colIndex}
                    >
                      <div className="font-sans w-full h-full inline-flex items-center justify-center text-2xl leading-none font-bold align-middle box-border text-black select-none">
                        {letter}
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
      </div>
    </div>
  );
}

export default WordGame;
