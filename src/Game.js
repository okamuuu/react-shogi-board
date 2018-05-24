import React, { Component } from 'react';
import { store, view } from 'react-easy-state';
import _ from 'lodash';

import Board from './components/Board';
import Box from './components/Box';
import Piece from './components/Piece';

const { Shogi } = require("shogi.js");

let shogi; // Business logic will be set here here.

const state = store({
  board: [[], [], [], [], [], [], [], [], []],
  selectedBox: {},
  movableBoxes: [],
  hands: [{}, {}],
  turn: 0,
  movablePoints: [],
});

function setState(shogi) {
  state.board = Object.assign([], shogi.board);
  state.hands = Object.assign([], shogi.hands);
  state.turn = shogi.turn;
}

// TODO: to hash data if we need
function isMovableBox(x, y) {
  return _.find(state.movableBoxes, {x, y})
}

function reset() {
  state.selectedBox = {};
  state.movableBoxes = [];
}

function handleClickBox(x, y) {
  if (_.isEmpty(state.selectedBox)) {
    selectPiece(x, y)
    return;
  } else if (isMovableBox(x, y)) {
    move(x, y);
  }

  reset();
}

function selectPiece(x, y) {
  const piece = shogi.get(x, y);
  if (!piece || shogi.turn !== piece.color) {
    return;
  }
  const movablePoints = shogi.getMovesFrom(x, y);

  state.selectedBox = {x, y};
  state.movableBoxes = movablePoints.map(x => x.to);
}

function move(x, y) {
  const { selectedBox } = state;

  const piece = shogi.get(selectedBox.x, selectedBox.y);
  shogi.move(selectedBox.x, selectedBox.y, x, y, false); // promote は後で考える

  // state を刷新する
  state.board = shogi.board;
  state.selectedBox = {};
  state.movableBoxes = [];
  state.turn = shogi.turn;
}

function movePiece(x, y) {
  const piece = shogi.get(state.movingFrom.x, state.movingFrom.y);
  console.log("movePiece");
  if (state.turn !== piece.color) {
    return;
  }
  let promote = false; // TODO: promote するかどうかの判定
  shogi.move(state.movingFrom.x, state.movingFrom.y, x, y, promote);
  state.board = shogi.board
  state.movingFrom = {x: "", y: ""};
  state.movableBoxes = [];
  state.turn = shogi.turn;
}

class Game extends Component {

  componentDidMount() {
    shogi = new Shogi();
    setState(shogi);
  }

  render() {

    const { board, hands, turn } = state;

    const isReversed = false;
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const reverseNumbers = [9, 8, 7, 6, 5, 4, 3, 2, 1];

    // 先手番視点では左から 9, 8, 7 ...
    const headNavNumbers = isReversed ? numbers : reverseNumbers;

    // 先手番視点では上から 一, 二, 三 ...
    const sideNavNumbers = isReversed ? reverseNumbers : numbers;

    const gameRows = [];

    if (board.length > 0) {
      sideNavNumbers.forEach(y => {
        headNavNumbers.forEach(x => {
          const piece = board[x-1][y-1] || {};
          gameRows.push({piece, x, y});
        })
      })
    }

    return (
      <div>
        <Board>
          {gameRows.map(({piece, x, y}) => (
            <Box key={x+"-"+y} overlay={isMovableBox(x, y)} onClick={() => handleClickBox(x, y)}>
              {
                piece && (<Piece color={piece.color} kind={piece.kind} />)
              }
            </Box>
          ))}
        </Board>
      </div>
    );
  }
}

export default view(Game);
