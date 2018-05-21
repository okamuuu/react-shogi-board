import React, { Component } from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { initGame } from '../actions'
import Board from '../components/Board'
import Button from '../components/Button'
import { PRESET, MOVE_DEF } from '../Constants';
import PieceModel from '../models/Piece';

class Game extends Component {

  componentWillMount() {
    this.props.initGame();
  }

  render() {
    return (
      <div>
        <Board rows={this.props.board} />
        <div style={{textAlign: `center`}}>
          <Button>Prev</Button>
          <Button>Next</Button>
        </div>
      </div>
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
