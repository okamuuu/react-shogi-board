import React, { Component } from 'react';
import { store, view } from 'react-easy-state'; // store is as observable
import _ from 'lodash';

import Board from './components/Board';
import Box from './components/Box';
import Piece from './components/Piece';
import { Hands, Hand } from './components/Hands';

const { Shogi, Color } = require("shogi.js");
const ShogiPiece = require("shogi.js").Piece;

let shogi; // Business logic will be set here here.

const state = store({
  board: [[], [], [], [], [], [], [], [], []],
  hands: [{}, {}],
  turn: 0,
  selectedBox: {},
  selectedHand: {},
  movableBoxes: [],
  droppableBoxes: [],
  moveCount: 0,
  sfen: "",
  bestpv: {},
  sfenOf: {},
});

function setInitialState(shogi) {
  state.board = Object.assign([], shogi.board);
  state.hands = Object.assign([], shogi.hands);
  state.moveCount = 1;
  state.turn = shogi.turn;
  state.sfen = _getCurrentSfen();
  state.sfenOf[state.moveCount] = state.sfen;
}

function _getCurrentSfen() {
  console.log(state.moveCount);
  return shogi.toSFENString(state.moveCount);
}

// TODO: ちゃんと考える
function parseMoveSFEN(string) {
  const chars = string.split('');

  const table = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9
  }
  return {
    fromX: parseInt(chars[0], 10),
    fromY: table[chars[1]],
    toX: parseInt(chars[2], 10),
    toY: table[chars[3]]
  }
}

// TODO: to hash data if we need
function isMovableBox(x, y) {
  return _.find(state.movableBoxes, {x, y})
}

function isDroppableBox(x, y) {
  return _.find(state.droppableBoxes, {x, y})
}

function reset() {
  state.selectedBox = {};
  state.selectedHand = {};
  state.movableBoxes = [];
  state.droppableBoxes = [];
}

function handleClickBox(x, y) {

  if (!_.isEmpty(state.selectedHand) && isDroppableBox(x, y)) {
    drop(x, y);
    return;
  }

  if (_.isEmpty(state.selectedBox)) {
    select(x, y)
    return;
  } else if (isMovableBox(x, y)) {
    move(x, y);
    return;
  }

  reset();
}

function handleClickHand(color, kind) {
  if (_.isEmpty(state.selectedHand)) {
    selectHand(color, kind);
    return;
  }
}

function select(x, y) {
  const piece = shogi.get(x, y);
  if (!piece || shogi.turn !== piece.color) {
    return;
  }
  const movablePoints = shogi.getMovesFrom(x, y);

  state.selectedBox = {x, y};
  state.movableBoxes = movablePoints.map(x => x.to);
}

// TODO: selectPiece と selectHand を同時に実行することはできない
function selectHand(color, kind) {
  if (shogi.turn !== color) {
    return;
  }
  state.selectedHand = {kind};
  state.droppableBoxes = shogi.getDropsBy(color).map(x => x.to);
}

function canPromoteKind(kind) {
  return ShogiPiece.canPromote(kind);
}

function canPromotePlace(color, y) {
  return color === Color.Black ? y <= 3 : y >= 7;
}

function canPromote(kind, color, fromY, toY) {
  if (!canPromoteKind(kind)) {
    return false;
  }

  if (!canPromotePlace(color, fromY) && !canPromotePlace(color, toY)) {
    return false;
  }

  return true;
}

function move(x, y) {
  const { selectedBox } = state;

  const piece = shogi.get(selectedBox.x, selectedBox.y);

  let promote = false;
  if (canPromote(piece.kind, piece.color, selectedBox.y, y)) {
    promote = window.confirm("成りますか?");
  }

  shogi.move(selectedBox.x, selectedBox.y, x, y, promote);

  // state を刷新する
  state.board = shogi.board;
  state.hands = shogi.hands;
  state.selectedBox = {};
  state.movableBoxes = [];
  state.turn = shogi.turn;
  state.moveCount++;
  state.sfen = _getCurrentSfen();
  state.sfenOf[state.moveCount] = state.sfen;
}

function drop(x, y) {
  console.log("drop");
  const { selectedHand } = state;

  console.log(x, y, selectedHand);
  shogi.drop(x, y, selectedHand.kind);

  // state を刷新する
  state.board = shogi.board;
  state.hands = shogi.hands;
  state.selectedHand = {};
  state.droppableBoxes = [];
  state.turn = shogi.turn;
}


function getHandsSammary(color) {
  if (!shogi) {
    return {}
  }
  return shogi.getHandsSummary(color);
}

class Game extends Component {

  constructor(props) {
    super(props);
    this.emitter = props.emitter;
    this.emitter.on("ai", (data) => {
      const { bestmove, bestpv } = data;
      console.log("fire ai", bestmove);
      const { fromX, fromY, toX, toY } = parseMoveSFEN(bestmove);
      shogi.move(fromX, fromY, toX, toY, false); // promote は後で考える

      // state を刷新する
      state.board = shogi.board;
      state.hands = shogi.hands;
      state.selectedBox = {};
      state.movableBoxes = [];
      state.turn = shogi.turn;
      state.moveCount++;
      state.sfen = _getCurrentSfen();
      state.bestpv = bestpv;
      state.sfenOf[state.moveCount] = state.sfen;
    });
  }

  componentDidMount(props) {
    shogi = new Shogi();
    setInitialState(shogi);
    this.shogi = shogi;
  }

  // 親 component が呼び出すために必要
  getCurrentSfen() {
    return _getCurrentSfen();
  }

  render() {
    const { nextMove } = this.props;
    const { board, hands, turn, sfen, bestpv } = state;

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

    const whiteHandsSammary = getHandsSammary(Color.White);
    const blackHandsSammary = getHandsSammary(Color.Black);

    return (
      <div style={{margin: "0 auto", maxWidth: "360px"}}>
        <Hands>
          { Object.keys(whiteHandsSammary).filter(kind => whiteHandsSammary[kind] > 0).map(kind => (
            <Hand onClick={() => handleClickHand(Color.White, kind)} key={kind} kind={kind} count={whiteHandsSammary[kind]} />
          )) }
        </Hands>
        <Board>
          {gameRows.map(({piece, x, y}) => (
            <Box key={x+"-"+y} overlay={isMovableBox(x, y) || isDroppableBox(x, y)} onClick={() => handleClickBox(x, y)}>
              {
                piece && (<Piece color={piece.color} kind={piece.kind} />)
              }
            </Box>
          ))}
        </Board>
        <Hands>
          { Object.keys(blackHandsSammary).filter(kind => blackHandsSammary[kind] > 0).map(kind => (
            <Hand onClick={() => handleClickHand(Color.Black, kind)} key={kind} kind={kind} count={blackHandsSammary[kind]} />
          )) }
        </Hands>
        <button onClick={() => console.log(state.sfenOf[state.moveCount-1])}>待った</button>
        <div>
          {sfen}
        </div>
        <div>
          {JSON.stringify(bestpv)}
        </div>
      </div>
    );
  }
}

export default view(Game);
