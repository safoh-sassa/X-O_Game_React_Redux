
export const CHANGE_BOARD_SIZE = 'CHANGE_BOARD_SIZE';

export function changeBoardSize(boardSize) {

    return {type: CHANGE_BOARD_SIZE, boardSize}
}


export const CHANGE_WINNER_LINE_SIZE = 'CHANGE_WINNER_LINE_SIZE';

export function changeWinnerLineSize(winnerLineSize) {
console.log(winnerLineSize, 'action');
    return {type: CHANGE_WINNER_LINE_SIZE, winnerLineSize}
}

export const INSERT_PLAYER_TO_X = 'INSERT_PLAYER_TO_X';

export function insertPlayerToX(index) {

    return {type: INSERT_PLAYER_TO_X, index}
}

export const INSERT_PLAYER_TO_O = 'INSERT_PLAYER_TO_O';

export function insertPlayerToO(index) {

    return {type: INSERT_PLAYER_TO_O,index}
}

export const NEW_GAME = 'NEW_GAME';

export function newGame(boardSize) {

    return {type: NEW_GAME,boardSize}
}


export const SET_STEP_NUMBER = 'SET_STEP_NUMBER';

export function setStepNumber(step) {

    return {type: SET_STEP_NUMBER,step}
}
