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
function setBoard(board) {
  return {
    type: SET_BOARD,
    board
  };
}

// Interface Layer
export function initGame() {

  const { board, turn } = player.shogi;

  return setBoard(board);
}

export function forwardGame() {
  player.forward();
  const { board, turn } = player.shogi;
  return setBoard(board);
}

export function backwardGame() {
  player.backward();
  const { board, turn } = player.shogi;
  return setBoard(board);
}

