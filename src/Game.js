import React, { Component } from 'react';
import { store, view } from 'react-easy-state';
import _ from 'lodash';

import Board from './components/Board';
import Box from './components/Box';
import Piece from './components/Piece';

const { Shogi } = require("shogi.js");

let shogi; // Business logic will be set here here.

const state = store({
  status: 0,
  board: [[], [], [], [], [], [], [], [], []],
  movableBoxes: [],
  hands: [{}, {}],
  turn: 0,
  movingFrom: {x: "", y: ""},
  movablePoints: [],
  movingTo: {x: "", y: ""}
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

function handleCancel() {
  // state.movableBoxes = [];
}

function handleSelectPiece(e, x, y) {
  const piece = shogi.get(x, y);
  e.stopPropagation();
  console.log("handleSelectPiece");
  if (state.turn !== piece.color) {
    return;
  }

  const movablePoints = shogi.getMovesFrom(x, y);
  state.movingFrom = {x, y};
  state.movableBoxes = movablePoints.map(x => x.to);
  // state.status = 1; // selecting
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
        <Board onClick={handleCancel}>
          {gameRows.map(({piece, x, y}) => (
            <Box key={x+"-"+y} overlay={isMovableBox(x, y)} onClick={() => movePiece(x, y)}>
              {
                piece && (<Piece onClick={(e) => handleSelectPiece(e, x, y, piece.color)} color={piece.color} kind={piece.kind} />)
              }
            </Box>
          ))}
        </Board>
      </div>
    );
  }
}

export default view(Game);
