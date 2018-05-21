import React, { Component } from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { initGame, forwardGame, backwardGame } from '../actions'
import Board from '../components/Board'
import Button from '../components/Button'
import { PRESET, MOVE_DEF } from '../Constants';
import PieceModel from '../models/Piece';

class Game extends Component {

  componentWillMount() {
    const { initGame } = this.props;
    initGame();
  }

  render() {
    const { board, forwardGame, backwardGame } = this.props;
    return (
      <div>
        <Board rows={this.props.board} />
        <div style={{textAlign: `center`}}>
          <Button onClick={() => backwardGame() }>Prev</Button>
          <Button onClick={() => forwardGame() }>Next</Button>
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
    initGame: () => dispatch(initGame()),
    forwardGame: () => dispatch(forwardGame()),
    backwardGame: () => dispatch(backwardGame())
  })
)(Game)
