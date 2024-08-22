import PropTypes from "prop-types";
import { createContext, useReducer } from "react";
import { ACTIONS } from "./ACTIONS";

export const GameContext = createContext(null);
export const GameDispatchContext = createContext(null);

const initialState = {
  guesses: [],
  currentGuess: "",
  currentRow: 0,
  answer: "GAMES",
  guessColor: [],
  status: "play",
};
console.log(initialState.answer);

function checkColor(currentGuess, answer) {
  let tmpResult = Array(5).fill("bg-gray-500");
  for (let i = 0; i < 5; i++) {
    if (currentGuess[i] === answer[i]) {
      tmpResult[i] = "bg-green-500";
      answer[i] = null;
    }
  }
  for (let i = 0; i < 5; i++) {
    let index = answer.indexOf(currentGuess[i]);
    if (index !== -1) {
      answer[index] = null;
      tmpResult[i] = "bg-yellow-500";
    }
  }
  return tmpResult;
}

function checkGuess(state) {
  if (state.currentGuess.length === 5 && state.status === "play") {
    let input = state.currentGuess.split("");
    let answer = state.answer.split("");

    let color = checkColor([...input], [...answer]);
    const isWin = input.every((_, index) => input[index] === answer[index]);

    if (isWin) {
      return {
        ...state,
        guesses: [...state.guesses, input],
        currentGuess: input,
        guessColor: [...state.guessColor, color],
        status: "win",
      };
    }

    return {
      ...state,
      guesses: [...state.guesses, input],
      currentGuess: "",
      currentRow: state.currentRow + 1,
      guessColor: [...state.guessColor, color],
      status: state.currentRow + 1 >= 6 ? "lose" : "play",
    };
  }
  return state;
}

// function generateNewAnswer() {
//   const words = ["HELLO", "WORLD", "CANDY", "GAMES", "APPLE"];
//   const answer = words[Math.floor(Math.random() * words.length)];
//   console.log(answer);
//   return answer;
// }

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_LETTER:
      if (state.currentGuess.length < 5 && state.status === "play") {
        return {
          ...state,
          currentGuess: state.currentGuess + action.payload.toUpperCase(),
        };
      }
      return state;

    case ACTIONS.REMOVE_LETTER:
      if (state.currentGuess.length > 0 && state.status === "play") {
        return {
          ...state,
          currentGuess: state.currentGuess.slice(0, -1),
        };
      }
      return state;

    case ACTIONS.SUBMIT_GUESS: {
      const updatadState = checkGuess(state);
      return updatadState;
    }

    case ACTIONS.RESET_GAME:
      if (state.status === "win" || state.status === "lose") {
        return {
          guesses: [],
          currentGuess: "",
          currentRow: 0,
          answer: "GAMES",
          guessColor: [],
          status: "play",
        };
      }
      return state;

    default:
      return state;
  }
}

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
