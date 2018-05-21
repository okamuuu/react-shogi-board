import _ from 'lodash'
import { PRESET, MOVE_DEF } from '../Constants';
import PieceModel from '../models/Piece';

export const SET_BOARD = 'SET_BOARD';

// This function name is out in principle.
// https://github.com/reactjs/redux/issues/1171#issuecomment-167615246
function setBoard(board) {
  return {
    type: SET_BOARD,
    board
  };
}

// Interface Layer
export function initGame(preset=PRESET.HIRATE) {

  // TODO: I want to move Business Logic from here. But still I'm not sure where to move.
  const { board, turn } = preset;
  const rows = board.map(row => {
    const csa = _.times(9, j => {
      const target = row.slice(24 - j * 3, 24 - j * 3 + 3);
      return target === " * " ? null : new PieceModel(target);
    });
    return csa;
  })

  return setBoard(rows);
}
