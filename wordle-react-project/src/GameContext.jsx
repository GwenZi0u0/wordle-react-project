import PropTypes from "prop-types";
import { createContext, useReducer } from "react";
import { ACTIONS } from "./ACTIONS";

export const GameContext = createContext(null);
export const GameDispatchContext = createContext(null);

const initialState = {
  guesses: Array(6).fill(""),
  currentGuess: "",
  currentRow: 0,
};

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
      if (state.currentGuess.length < 5) {
        return {
          ...state,
          currentGuess: state.currentGuess + action.payload.toUpperCase(),
        };
      }
      return state;

    case ACTIONS.REMOVE_LETTER:
      return {
        ...state,
        currentGuess: state.currentGuess.slice(0, -1),
      };

    case ACTIONS.SUBMIT_GUESS:
      if (state.currentGuess.length === 5) {
        return {
          ...state,
          guesses: [...state.guesses, state.currentGuess],
          currentGuess: "",
          currentRow: state.currentRow + 1,
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
