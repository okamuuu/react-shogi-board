import React, { Component } from 'react';
import _ from 'lodash'
import { connect } from 'react-redux'
import { initGame, forwardGame } from '../actions'
import Board from '../components/Board'
import Button from '../components/Button'
import { PRESET, MOVE_DEF } from '../Constants';
import PieceModel from '../models/Piece';

class Game extends Component {

  componentWillMount() {
    const { initGame } = this.props;
    initGame();
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    console.log(nextProps);

  }

  render() {
    const { board, forwardGame } = this.props;
    console.log("render");
    console.log(this.props.board);
    return (
      <div>
        <Board rows={this.props.board} />
        <div style={{textAlign: `center`}}>
          <Button>Prev</Button>
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
    forwardGame: () => dispatch(forwardGame())
  })
)(Game)
