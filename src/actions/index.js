import _ from 'lodash'
import { PRESET, MOVE_DEF } from '../Constants';
import PieceModel from '../models/Piece';
// TODO: should I set player to redux state ? It's a bussiness model to calculate complex data.
import { JKFPlayer } from "json-kifu-format";
import kifu from './../data/kifu.demo.js';
let player = JKFPlayer.parseKIF(kifu);

export const SET_BOARD = 'SET_BOARD';

// This function name is out in principle.
// https://github.com/reactjs/redux/issues/1171#issuecomment-167615246
function setBoard({board, hands, color}) {
  return {
    type: SET_BOARD,
    board,
    hands,
    color
  };
}

// Interface Layer
export function initGame() {
  const { board, hands, color } = player.getState();
  return setBoard({board, hands, color});
}

export function forwardGame() {
  player.forward();
  const { board, hands, color } = player.getState();
  return setBoard({board, hands, color});
}

export function backwardGame() {
  player.backward();
  const { board, hands, color } = player.getState();
  return setBoard({board, hands, color});
}

