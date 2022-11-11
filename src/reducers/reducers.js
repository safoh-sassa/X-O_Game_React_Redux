import { CHANGE_BOARD_SIZE } from '../actions/actions'
import { CHANGE_WINNER_LINE_SIZE } from '../actions/actions'
import { INSERT_PLAYER_TO_X } from '../actions/actions'
import { INSERT_PLAYER_TO_O } from '../actions/actions'
import { NEW_GAME } from '../actions/actions'
import { SET_STEP_NUMBER } from '../actions/actions'

const initialState = {

  boardSize: 5,
  winnerLineSize: 3,
  currentStep: 0,
  xList: [],
  oList: [],

};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_BOARD_SIZE:
      return {
        ...state,
        boardSize: action.boardSize

      }

    case CHANGE_WINNER_LINE_SIZE:
      return {
        ...state,
        winnerLineSize: action.winnerLineSize
      }

    case NEW_GAME:
      return {
        ...state,
        oList: [...state.oList = []],
        xList: [...state.xList = []]
      }

    case INSERT_PLAYER_TO_X:
      return {
        ...state,
        ...state.xList.push(action.index)
      }

    case INSERT_PLAYER_TO_O:
      return {
        ...state,
        ...state.oList.push(action.index)
      }

    case SET_STEP_NUMBER:
      return {

        ...state,
        currentStep: action.step
      }

    default:
      return state
  }
};

export default reducer