import React, { Component } from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { initGame } from '../actions'
import Board from '../components/Board'
import { PRESET, MOVE_DEF } from '../Constants';
import PieceModel from '../models/Piece';

class Game extends Component {

  componentWillMount() {
    this.props.initGame();
  }

  render() {
    return (
      <Board rows={this.props.board} />
    )
  }
}

export default connect(
  state => ({
    board: state.board
  }),
  dispatch => ({
    initGame: () => dispatch(initGame())
  })
)(Game)
