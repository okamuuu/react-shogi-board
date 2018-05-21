import React from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { setBoard } from '../actions'
import Board from '../components/Board'
import { PRESET, MOVE_DEF } from '../Constants';
import PieceModel from '../models/Piece';

const Game = () => {

  const { board, turn } = PRESET.HIRATE;
  const rows = board.map(row => {
    const csa = _.times(9, j => {
      const target = row.slice(24 - j * 3, 24 - j * 3 + 3);
      return target === " * " ? null : new PieceModel(target);
    });
    return csa;
  })

  return (
    <Board rows={rows} />
  )
}

export default connect(
  state => {
    board: state.board
  },
  dispatch => {
    setBoard : board => dispatch(setBoard(board))
  }
)(Game)
