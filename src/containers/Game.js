import React, { Component } from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { initGame, forwardGame, backwardGame } from '../actions'
import Board from '../components/Board'
import Hands from '../components/Hands'
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
    console.log(this.props);
    return (
      <div>
        <Hands hands={this.props.hands[1]} />
        <Board rows={this.props.board} />
        <Hands hands={this.props.hands[0]} />
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
    board: state.board,
    hands: state.hands,
    color: state.color
  }),
  dispatch => ({
    initGame: () => dispatch(initGame()),
    forwardGame: () => dispatch(forwardGame()),
    backwardGame: () => dispatch(backwardGame())
  })
)(Game)
